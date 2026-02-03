import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import ListItemPaymentMethod from "../ListItem/PaymentMethod/ListItemPaymentMethod";
import ListItem from "../ListItem/ListItem";
import { BankIcon } from "../icons/BankIcon";
import { InfoCircleIcon } from "../icons/InfoCircleIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { IconContainer } from "../IconContainer";
import { colorMaps, spacing } from "../tokens";

/**
 * Slot for Choosing a Bank Account
 * Figma Node: 77:20810
 */
export default function PmBakSlot() {
  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.header}>
        Choose bank account
      </FoldText>
      <View style={styles.list}>
        <ListItemPaymentMethod
          title="Wells Fargo"
          secondaryText="•••• 0823"
          tertiaryText="Deposit fee waved"
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          onPress={() => { }}
        />
        <ListItemPaymentMethod
          title="Chase"
          secondaryText="•••• 1234"
          tertiaryText="Deposit fee waved"
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          onPress={() => { }}
        />
        <ListItem
          variant="feature"
          title="Add a bank account"
          showDivider
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<InfoCircleIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={<ChevronRightIcon width={24} height={24} color={colorMaps.face.primary} />}
          onPress={() => { }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing["300"],
    gap: spacing["600"],
  },
  header: {
    color: colorMaps.face.primary,
  },
  list: {
    width: "100%",
  },
});
