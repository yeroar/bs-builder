import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing } from "../../tokens";

export interface ListItemReceiptProps {
  label?: string;
  value?: string;
  denominator?: string;
  hasDenominator?: boolean;
  style?: ViewStyle;
}

export default function ListItemReceipt({
  label = "Purchase amount",
  value = "90,000 sats",
  denominator = "$90",
  hasDenominator = false,
  style,
}: ListItemReceiptProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {/* Left column - Label */}
        <View style={styles.leftColumn}>
          <FoldText type="body-md" style={styles.label}>
            {label}
          </FoldText>
        </View>

        {/* Right column - Value & Denominator */}
        <View style={styles.rightColumn}>
          <FoldText type="body-md-bold" style={styles.value}>
            {value}
          </FoldText>
          {hasDenominator && denominator && (
            <FoldText type="body-md" style={styles.denominator}>
              {denominator}
            </FoldText>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing["400"],
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  leftColumn: {
    flex: 1,
  },
  label: {
    color: colorMaps.face.secondary,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  value: {
    color: colorMaps.face.primary,
    textAlign: "right",
  },
  denominator: {
    color: colorMaps.face.secondary,
    textAlign: "right",
  },
});
