import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { spacing } from "../../../components/tokens";

export interface InstantDepositSuccessProps {
  amount: string;
}

export default function InstantDepositSuccess({ amount }: InstantDepositSuccessProps) {
  return (
    <View style={styles.content}>
      <CurrencyInput
        value={amount}
        topContextVariant="empty"
        bottomContextVariant="empty"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
