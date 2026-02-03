import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorPrimitives } from "../tokens/colorPrimitives";
import { colorMaps, spacing } from "../tokens";
import PriceChange from "./PriceChange";
import { useExchange } from "./ExchangeContext";

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
  const formattedPrice =
    typeof price === "string"
      ? price
      : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

  const renderPriceChange = () => {
    if (priceChange) return priceChange;

    const isPositive = (percentage || 0) >= 0;
    const absPercentage = Math.abs(percentage || 0);
    const percentageText =
      absPercentage >= 1000
        ? `${Math.floor(absPercentage / 1000)}K%`
        : `${absPercentage.toFixed(2)}%`;

    return <PriceChange label={percentageText} isPositive={isPositive} />;
  };

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
          <FoldText type="header-md" style={styles.text}>
            {formattedPrice}
          </FoldText>
          {renderPriceChange()}
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
  performance: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  text: {
    color: colorMaps.face.primary,
  },
  timePeriodText: {
    color: colorPrimitives.yellow["700"],
  },
});
