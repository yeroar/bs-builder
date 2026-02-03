import React from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon";
import { SwapIcon } from "../../Icons/SwapIcon";
import { colorMaps, spacing } from "../../tokens";

export interface ProductSurfacePrimaryProps {
  variant?: "expanded" | "condensed";
  label?: string;
  amount?: string;
  secondaryAmount?: string;
  hasLabelIcon?: boolean;
  swapCurrency?: boolean;
  progressViz?: React.ReactNode;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  tertiaryButton?: React.ReactNode;
  onLabelPress?: () => void;
  onAmountPress?: () => void;
  messageSlot?: React.ReactNode;
  style?: ViewStyle;
}

export default function ProductSurfacePrimary({
  variant = "expanded",
  label = "Label",
  amount = "$0.00",
  hasLabelIcon = false,
  swapCurrency = false,
  progressViz,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  onLabelPress,
  onAmountPress,
  messageSlot,
  style,
}: ProductSurfacePrimaryProps) {
  const isCondensed = variant === "condensed";

  const hasButtons = primaryButton || secondaryButton || tertiaryButton;

  return (
    <View style={[styles.container, style]}>
      {/* Balance section */}
      <View style={styles.balanceSection}>
        <View style={[styles.balanceRow, isCondensed && styles.balanceRowCondensed]}>
          {/* Label with chevron */}
          <Pressable
            style={styles.labelRow}
            onPress={onLabelPress}
            disabled={!onLabelPress}
          >
            <FoldText type="header-md" style={styles.labelText}>
              {label}
            </FoldText>
            {hasLabelIcon && (
              <ChevronRightIcon
                width={20}
                height={20}
                color={colorMaps.face.primary}
              />
            )}
          </Pressable>

          {/* Amount with swap icon */}
          <Pressable
            style={[styles.amountRow, isCondensed && styles.amountRowCondensed]}
            onPress={onAmountPress}
            disabled={!onAmountPress}
          >
            <FoldText type="header-md" style={styles.amountText}>
              {amount}
            </FoldText>
            {swapCurrency && (
              <SwapIcon
                width={20}
                height={20}
                color={colorMaps.face.primary}
              />
            )}
          </Pressable>
        </View>

        {/* Progress visualization */}
        {progressViz}
      </View>

      {/* Action buttons */}
      {hasButtons && (
        <View style={styles.buttonsRow}>
          {primaryButton && (
            <View style={styles.buttonWrapper}>
              {React.cloneElement(primaryButton as React.ReactElement<any>, {
                style: { width: "100%", paddingHorizontal: 0 },
                numberOfLines: 1,
              })}
            </View>
          )}
          {secondaryButton && (
            <View style={styles.buttonWrapper}>
              {React.cloneElement(secondaryButton as React.ReactElement<any>, {
                style: { width: "100%", paddingHorizontal: 0 },
                numberOfLines: 1,
              })}
            </View>
          )}
          {tertiaryButton && (
            <View style={styles.buttonWrapper}>
              {React.cloneElement(tertiaryButton as React.ReactElement<any>, {
                style: { width: "100%", paddingHorizontal: 0 },
                numberOfLines: 1,
              })}
            </View>
          )}
        </View>
      )}

      {/* Marcom / Message slot */}
      {messageSlot}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["800"],
    gap: spacing["500"],
    width: "100%",
  },
  balanceSection: {
    gap: spacing["300"],
  },
  balanceRow: {
    flexDirection: "column",
    gap: spacing["100"],
  },
  balanceRowCondensed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  amountRowCondensed: {
    justifyContent: "flex-end",
  },
  labelText: {
    color: colorMaps.face.primary,
  },
  amountText: {
    color: colorMaps.face.primary,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  buttonWrapper: {
    flex: 1,
    minWidth: 0,
  },
});
