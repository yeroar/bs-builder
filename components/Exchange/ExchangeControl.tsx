import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../tokens";
import PillGroup from "./PillGroup";
import ActionBar from "./ActionBar";
import { TimeRange } from "./PriceChart";
import { useExchange } from "./ExchangeContext";

export interface ExchangeControlProps {
  selectedPeriod?: "24h" | "1w" | "1m" | "1y" | "all";
  onPeriodSelect?: (period: string) => void;
  onBuy?: () => void;
  onSell?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const PERIODS = ["24h", "1w", "1m", "1y", "all"];

export default function ExchangeControl({
  selectedPeriod: propSelectedPeriod,
  onPeriodSelect: propOnPeriodSelect,
  onBuy,
  onSell,
  style,
  testID,
}: ExchangeControlProps) {
  const context = useExchange();
  const activePeriod = propSelectedPeriod || context.selectedPeriod;
  const handlePeriodSelect = propOnPeriodSelect || context.setSelectedPeriod;
  const handleBuy = onBuy || context.onHistoryPress;
  const handleSell = onSell || context.onHistoryPress;

  const periodToActive: Record<string, TimeRange> = {
    "24h": "24H",
    "1w": "1W",
    "1m": "1M",
    "1y": "1Y",
    "all": "ALL",
  };

  const activeToPeriod: Record<TimeRange, string> = {
    "24H": "24h",
    "1W": "1w",
    "1M": "1m",
    "1Y": "1y",
    "ALL": "all",
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <PillGroup
        active={periodToActive[activePeriod] || "ALL"}
        onSelect={(active) => handlePeriodSelect(activeToPeriod[active])}
        variant="onBrand"
      />
      <ActionBar
        onBuy={handleBuy}
        onSell={handleSell}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: spacing["600"],
    paddingTop: spacing["600"],
    paddingBottom: spacing["800"],
    paddingHorizontal: spacing["500"],
  },
});
