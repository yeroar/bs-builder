import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, ViewStyle, TextInput } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorPrimitives } from "../tokens/colorPrimitives";
import { colorMaps, spacing } from "../tokens";
import { ArrowNarrowUpIcon } from "../Icons/ArrowNarrowUpIcon";
import { useExchange } from "./ExchangeContext";

export const formatPrice = (price: number | string | undefined): string => {
  if (price === undefined) return "$0.00";
  if (typeof price === "string") return price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatPercent = (pct: number | undefined): string => {
  const abs = Math.abs(pct || 0);
  return abs >= 1000 ? `${Math.floor(abs / 1000)}K%` : `${abs.toFixed(2)}%`;
};

export interface BtcPriceProps {
  price?: number | string;
  percentage?: number;
  label?: string;
  timePeriod?: string;
  priceChange?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

const BtcPriceComponent: React.FC<BtcPriceProps> = ({
  price: propPrice,
  percentage: propPercentage,
  label = "Bitcoin",
  timePeriod: propTimePeriod,
  priceChange,
  style,
  testID,
}) => {
  const context = useExchange();
  const price = propPrice !== undefined ? propPrice : context.currentPrice;
  const percentage = propPercentage !== undefined ? propPercentage : context.currentPercentage;

  const periodLabels: Record<string, string> = {
    "24h": "Past 24H",
    "1w": "Past 1 week",
    "1m": "Past 1 month",
    "1y": "Past 1 year",
    "all": "All time",
  };

  const timePeriod = propTimePeriod || periodLabels[context.selectedPeriod] || "All time";
  const formattedPrice = formatPrice(price);
  const isPositive = (percentage || 0) >= 0;

  // Sync context refs with initial/rest values
  const syncDisplayRefs = useCallback(() => {
    const priceEl = context.priceDisplayRef.current;
    if (priceEl) {
      priceEl.setNativeProps({ text: formattedPrice });
    }
    const pctEl = context.percentDisplayRef.current;
    if (pctEl) {
      pctEl.setNativeProps({ text: formatPercent(percentage) });
    }
  }, [formattedPrice, percentage]);

  useEffect(() => {
    syncDisplayRefs();
  }, [syncDisplayRefs]);

  const arrowColor = isPositive
    ? colorMaps.face.positiveBold
    : colorMaps.face.negativeBold;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <FoldText type="header-md" style={styles.text}>
            {label}
          </FoldText>
          <FoldText type="body-md" style={styles.timePeriodText}>
            {timePeriod}
          </FoldText>
        </View>
        <View style={styles.bottomRow}>
          {/* Price — direct mutation via ref, zero re-renders during scrub */}
          <TextInput
            ref={context.priceDisplayRef}
            editable={false}
            defaultValue={formattedPrice}
            style={[styles.nativeText, styles.text]}
            pointerEvents="none"
          />
          {priceChange || (
            <View style={styles.percentRow}>
              <ArrowNarrowUpIcon
                width={24}
                height={24}
                color={arrowColor}
                style={{ transform: [{ rotate: isPositive ? "0deg" : "180deg" }] }}
              />
              <TextInput
                ref={context.percentDisplayRef}
                editable={false}
                defaultValue={formatPercent(percentage)}
                style={[styles.nativeText, styles.text]}
                pointerEvents="none"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const BtcPrice = React.memo(BtcPriceComponent);
export default BtcPrice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.object.primary.bold.default,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["800"],
    width: "100%",
  },
  content: {
    gap: spacing["100"],
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  nativeText: {
    fontFamily: "Geist",
    fontWeight: "400",
    fontSize: 24,
    lineHeight: 28,
    padding: 0,
    margin: 0,
  },
  text: {
    color: colorMaps.face.primary,
  },
  timePeriodText: {
    color: colorPrimitives.yellow["700"],
  },
});
