import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import Chip from "../../../components/Primitives/Chip/Chip";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import { CreditCardDownloadIcon } from "../../../components/Icons/CreditCardDownloadIcon";
import { BankIcon } from "../../../components/Icons/BankIcon";
import { CalendarPlusIcon } from "../../../components/Icons/CalendarPlusIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export type DepositOption = "instant" | "oneTime" | "recurring";

export interface DepositOptionsProps {
  onInstantPress?: () => void;
  onOneTimePress?: () => void;
  onRecurringPress?: () => void;
  testID?: string;
}

export default function DepositOptions({
  onInstantPress,
  onOneTimePress,
  onRecurringPress,
  testID,
}: DepositOptionsProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Deposit cash
      </FoldText>

      <View style={styles.list}>
        <ListItem
          variant="feature"
          title="Instant"
          secondaryText="Fund from a linked debit card"
          chip={<Chip label="1.5% fee" type="accent" />}
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<CreditCardDownloadIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={
            <ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />
          }
          onPress={onInstantPress}
        />

        <ListItem
          variant="feature"
          title="One-time"
          secondaryText="Fund from a linked bank account"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={
            <ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />
          }
          onPress={onOneTimePress}
        />

        <ListItem
          variant="feature"
          title="Recurring"
          secondaryText="Scheduled a recurring deposit"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<CalendarPlusIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={
            <ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />
          }
          onPress={onRecurringPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["800"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  list: {
    gap: spacing["none"],
  },
});
