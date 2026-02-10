import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../components/DataDisplay/ListItem/PaymentMethod/ListItemPaymentMethod";
import { IconContainer } from "../../../../components/Primitives/IconContainer";
import { colorMaps, spacing } from "../../../../components/tokens";

export type FoldPaymentOption = "cashBalance" | "creditCard";

export interface ChoosePaymentMethodFoldProps {
  cashBalance?: string;
  cashBalanceSats?: string;
  creditCardLastFour?: string;
  selectedOption?: FoldPaymentOption;
  onSelectOption?: (option: FoldPaymentOption) => void;
  testID?: string;
}

export default function ChoosePaymentMethodFold({
  cashBalance = "$500.00",
  cashBalanceSats = "nn sats",
  creditCardLastFour = "0823",
  selectedOption,
  onSelectOption,
  testID,
}: ChoosePaymentMethodFoldProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Choose payment method
      </FoldText>

      <View style={styles.list}>
        <ListItemPaymentMethod
          title="Cash balance"
          secondaryText={cashBalance}
          icon={<IconContainer brand="cash" size="lg" />}
          trailingVariant="selectable"
          selected={selectedOption === "cashBalance"}
          onPress={() => onSelectOption?.("cashBalance")}
        />

        <ListItemPaymentMethod
          title="Credit Card"
          secondaryText={`•••• ${creditCardLastFour}`}
          icon={<IconContainer brand="credit" size="lg" />}
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
