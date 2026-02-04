import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { colorMaps, spacing } from "../../../tokens";

export type DenominatorLayout = "horizontal" | "vertical";

export interface ListItemReceiptProps {
  label?: string;
  value?: string;
  denominator?: string;
  hasDenominator?: boolean;
  /** Layout for denominator: "horizontal" (inline) or "vertical" (below) */
  denominatorLayout?: DenominatorLayout;
  style?: ViewStyle;
}

export default function ListItemReceipt({
  label = "Purchase amount",
  value = "90,000 sats",
  denominator = "$90",
  hasDenominator = false,
  denominatorLayout = "horizontal",
  style,
}: ListItemReceiptProps) {
  const isVertical = denominatorLayout === "vertical";

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
          {isVertical ? (
            <>
              <FoldText type="body-md-bold" style={styles.value} numberOfLines={1}>
                {value}
              </FoldText>
              {hasDenominator && denominator && (
                <FoldText type="body-md" style={styles.denominator} numberOfLines={1}>
                  {denominator}
                </FoldText>
              )}
            </>
          ) : (
            <FoldText type="body-md-bold" style={styles.value} numberOfLines={1}>
              {value}
              {hasDenominator && denominator && (
                <FoldText type="body-md" style={styles.denominator}>
                  {" "}{denominator}
                </FoldText>
              )}
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
    flexShrink: 0,
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
    color: colorMaps.face.tertiary,
    textAlign: "right",
  },
});
