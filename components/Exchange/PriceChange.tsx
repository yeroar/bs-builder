import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { ArrowNarrowUpIcon } from "../icons/ArrowNarrowUpIcon";
import { colorMaps, spacing } from "../tokens";

export interface PriceChangeProps {
  label: string;
  isPositive?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function PriceChange({
  label,
  isPositive = true,
  style,
  testID,
}: PriceChangeProps) {
  const performanceColor = isPositive
    ? colorMaps.face.positiveBold
    : colorMaps.face.negativeBold;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <ArrowNarrowUpIcon
        width={24}
        height={24}
        color={performanceColor}
        style={{
          transform: [{ rotate: isPositive ? "0deg" : "180deg" }],
        }}
      />
      <FoldText type="header-md" style={[styles.text, { color: colorMaps.face.primary }]}>
        {label}
      </FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  text: {
    // Shared text styles if any
  },
});
