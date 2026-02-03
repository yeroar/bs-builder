import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../tokens";
import ExchangeButton from "./ExchangeButton";

export interface ActionBarProps {
  buyLabel?: string;
  sellLabel?: string;
  onBuy?: () => void;
  onSell?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function ActionBar({
  buyLabel = "Buy",
  sellLabel = "Sell",
  onBuy,
  onSell,
  style,
  testID,
}: ActionBarProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ExchangeButton label={buyLabel} onPress={onBuy} />
      <ExchangeButton label={sellLabel} onPress={onSell} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing["300"],
  },
});
