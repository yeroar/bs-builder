import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import TopContext, { TopContextVariant } from "./TopContext";
import BottomContext, { BottomContextVariant } from "./BottomContext";
import { PmSelectorVariant } from "./PmSelector";
import { colorMaps, spacing } from "../../tokens";

export interface CurrencyInputProps {
  value: string;
  topContextVariant?: TopContextVariant;
  topContextValue?: string;
  topContextLeadingIcon?: React.ReactNode;
  bottomContextVariant?: BottomContextVariant;
  maxAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onMaxPress?: () => void;
  onPaymentMethodPress?: () => void;
  /** Slot for top context (for Figma Code Connect) */
  topContextSlot?: React.ReactNode;
  /** Slot for bottom context (for Figma Code Connect) */
  bottomContextSlot?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export default function CurrencyInput({
  value = "$0",
  topContextVariant = "btc",
  topContextValue = "~฿0",
  topContextLeadingIcon,
  bottomContextVariant = "maxButton",
  maxAmount = "$0.00",
  paymentMethodVariant = "null",
  paymentMethodBrand,
  paymentMethodLabel,
  onMaxPress,
  onPaymentMethodPress,
  topContextSlot,
  bottomContextSlot,
  style,
  testID,
}: CurrencyInputProps) {
  return (
    <View
      style={[styles.container, style]}
      testID={testID}
    >
      {topContextSlot || (
        <TopContext
          variant={topContextVariant}
          value={topContextValue}
          leadingIcon={topContextLeadingIcon}
        />
      )}

      <FoldText type="header-xl" style={styles.amount} numberOfLines={1}>
        {value}
      </FoldText>

      {bottomContextSlot || (
        <BottomContext
          variant={bottomContextVariant}
          maxAmount={maxAmount}
          paymentMethodVariant={paymentMethodVariant}
          paymentMethodBrand={paymentMethodBrand}
          paymentMethodLabel={paymentMethodLabel}
          onMaxPress={onMaxPress}
          onPaymentMethodPress={onPaymentMethodPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing["600"],
    paddingVertical: spacing["1200"],
    width: "100%",
  },
  amount: {
    color: colorMaps.face.primary,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1,
    textAlign: "center",
    width: "100%",
  },
});
