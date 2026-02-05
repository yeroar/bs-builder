import React from "react";
import { View, Pressable, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import PmSelector, { PmSelectorVariant } from "./PmSelector";
import { colorMaps, spacing, radius } from "../../tokens";

export type BottomContextVariant = "maxButton" | "paymentMethod" | "addPaymentMethod" | "empty" | "none";

export interface BottomContextProps {
  variant?: BottomContextVariant;
  maxAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onMaxPress?: () => void;
  onPaymentMethodPress?: () => void;
  /** Children slot for Figma Code Connect */
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export default function BottomContext({
  variant = "maxButton",
  maxAmount = "$0.00",
  paymentMethodVariant = "null",
  paymentMethodBrand,
  paymentMethodLabel,
  onMaxPress,
  onPaymentMethodPress,
  children,
  style,
  testID,
}: BottomContextProps) {
  if (variant === "none") {
    return null;
  }

  if (variant === "empty") {
    return <View style={[styles.emptyContainer, style]} testID={testID} />;
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      {children || (
        <>
          {variant === "maxButton" && (
            <Pressable
              onPress={onMaxPress}
              style={({ pressed }) => [
                styles.maxButton,
                pressed && styles.maxButtonPressed,
              ]}
            >
              <FoldText type="body-md-bold" style={styles.maxButtonText}>
                Max {maxAmount}
              </FoldText>
            </Pressable>
          )}

          {variant === "paymentMethod" && (
            <PmSelector
              variant={paymentMethodVariant}
              brand={paymentMethodBrand}
              label={paymentMethodLabel}
              onPress={onPaymentMethodPress}
            />
          )}

          {variant === "addPaymentMethod" && (
            <PmSelector
              variant="null"
              onPress={onPaymentMethodPress}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    height: 20,
  },
  maxButton: {
    height: 32,
    paddingHorizontal: spacing["200"],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorMaps.object.secondary.default,
    borderRadius: radius.md,
  },
  maxButtonPressed: {
    backgroundColor: colorMaps.object.secondary.pressed,
  },
  maxButtonText: {
    color: colorMaps.face.primary,
    fontSize: 14,
    lineHeight: 14,
  },
});
