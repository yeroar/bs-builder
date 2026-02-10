import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import Chip from "../../../components/Primitives/Chip/Chip";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import { CreditCardDownloadIcon } from "../../../components/Icons/CreditCardDownloadIcon";
import { BankIcon } from "../../../components/Icons/BankIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface WithdrawOptionsSlotProps {
  onInstantPress?: () => void;
  onOneTimePress?: () => void;
}

export default function WithdrawOptionsSlot({
  onInstantPress,
  onOneTimePress,
}: WithdrawOptionsSlotProps) {
  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.title}>
        Withdraw cash
      </FoldText>

      <View style={styles.list}>
        <ListItem
          variant="feature"
          title="Instant"
          secondaryText="Withdraw to a linked debit card"
          tertiaryText="Arrives within 24 hrs"
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
          secondaryText="Withdraw to a linked bank account"
          tertiaryText="Arrives within 1-5 business days"
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
