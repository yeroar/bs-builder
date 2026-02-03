import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../../components/DataDisplay/ListItem/PaymentMethod/ListItemPaymentMethod";
import { BankIcon } from "../../../../../components/Icons/BankIcon";
import CreditCardIcon from "../../../../../components/Icons/CreditCardIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";

export type FoldPaymentOption = "cashBalance" | "creditCard";

export interface ChoosePaymentMethodFoldSlotProps {
  cashBalance?: string;
  cashBalanceSats?: string;
  creditCardLastFour?: string;
  selectedOption?: FoldPaymentOption;
  onSelectOption?: (option: FoldPaymentOption) => void;
  testID?: string;
}

export default function ChoosePaymentMethodFoldSlot({
  cashBalance = "$500.00",
  cashBalanceSats = "nn sats",
  creditCardLastFour = "0823",
  selectedOption,
  onSelectOption,
  testID,
}: ChoosePaymentMethodFoldSlotProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Choose payment method
      </FoldText>

      <View style={styles.list}>
        <ListItemPaymentMethod
          title="Cash balance"
          secondaryText={cashBalance}
          tertiaryText={cashBalanceSats}
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          trailingVariant="selectable"
          selected={selectedOption === "cashBalance"}
          onPress={() => onSelectOption?.("cashBalance")}
        />

        <ListItemPaymentMethod
          title="Credit Card"
          secondaryText={`•••• ${creditCardLastFour}`}
          tertiaryText="Deposit fee waved"
          icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
          trailingVariant="selectable"
          selected={selectedOption === "creditCard"}
          onPress={() => onSelectOption?.("creditCard")}
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
