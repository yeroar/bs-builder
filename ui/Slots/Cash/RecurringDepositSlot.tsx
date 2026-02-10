import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
import { CalendarPlusIcon } from "../../../components/Icons/CalendarPlusIcon";
import { CalendarIcon } from "../../../components/Icons/CalendarIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import Chip from "../../../components/Primitives/Chip/Chip";
import { colorMaps, spacing } from "../../../components/tokens";

export interface ScheduledDeposit {
  title: string;
  secondaryText: string;
  status?: "active" | "paused";
  onPress?: () => void;
}

export interface RecurringDepositSlotProps {
  hasActive?: boolean;
  onSchedulePress?: () => void;
  scheduledDeposits?: ScheduledDeposit[];
}

export default function RecurringDepositSlot({
  hasActive = true,
  onSchedulePress,
  scheduledDeposits = [
    { title: "Weekly deposit", secondaryText: "$100 every week" },
  ],
}: RecurringDepositSlotProps) {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        header="Recurring deposit"
        body="Set up automatic transfers to your Fold Card on a schedule that works for you."
      />

      <View style={styles.actionSection}>
        <ListItem
          variant="feature"
          title="Schedule a recurring deposit"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<CalendarPlusIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onSchedulePress}
        />
      </View>

      {hasActive && (
        <>
          <Divider />

          <View style={styles.scheduledSection}>
            <FoldText type="header-xs" style={styles.sectionTitle}>
              Scheduled deposits
            </FoldText>
            {scheduledDeposits.map((deposit, index) => (
              <ListItem
                key={index}
                variant="feature"
                title={deposit.title}
                secondaryText={deposit.secondaryText}
                chip={deposit.status === "paused" ? <Chip label="Paused" type="accent" /> : undefined}
                leadingSlot={
                  <IconContainer
                    variant="active"
                    size="lg"
                    icon={<CalendarIcon width={20} height={20} color={colorMaps.face.primary} />}
                  />
                }
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
                onPress={deposit.onPress}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  actionSection: {
    paddingHorizontal: spacing["500"],
    paddingBottom: spacing["1000"],
  },
  scheduledSection: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["1000"],
    gap: spacing["300"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
  },
});
