import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorMaps, spacing, radius } from "../tokens";

export type IconContainerVariant =
  | "default-fill"
  | "default-stroke"
  | "active"
  | "error"
  | "success";

export type IconContainerSize = "lg" | "md" | "sm";

export interface IconContainerProps {
  icon?: React.ReactNode;
  variant?: IconContainerVariant;
  size?: IconContainerSize;
  style?: ViewStyle;
  testID?: string;
}

const SIZE_CONFIG = {
  lg: {
    padding: 10,
    borderRadius: radius.lg,
    iconSize: 24,
  },
  md: {
    padding: spacing["200"],
    borderRadius: radius.md,
    iconSize: 24,
  },
  sm: {
    padding: spacing["150"],
    borderRadius: radius.md,
    iconSize: 24,
  },
} as const;

const VARIANT_STYLES = {
  "default-fill": {
    backgroundColor: colorMaps.object.secondary.default,
    borderWidth: 0,
    borderColor: "transparent",
  },
  "default-stroke": {
    backgroundColor: colorMaps.object.tertiary.default,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
  },
  active: {
    backgroundColor: colorMaps.object.primary.bold.default,
    borderWidth: 0,
    borderColor: "transparent",
  },
  error: {
    backgroundColor: colorMaps.object.negative.bold.default,
    borderWidth: 0,
    borderColor: "transparent",
  },
  success: {
    backgroundColor: colorMaps.object.positive.bold.default,
    borderWidth: 0,
    borderColor: "transparent",
  },
} as const;

export default function IconContainer({
  icon,
  variant = "default-fill",
  size = "lg",
  style,
  testID,
}: IconContainerProps) {
  const sizeConfig = SIZE_CONFIG[size];
  const variantStyle = VARIANT_STYLES[variant];

  return (
    <View
      style={[
        styles.container,
        {
          padding: sizeConfig.padding,
          borderRadius: sizeConfig.borderRadius,
          backgroundColor: variantStyle.backgroundColor,
          borderWidth: variantStyle.borderWidth,
          borderColor: variantStyle.borderColor,
        },
        style,
      ]}
      testID={testID}
    >
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
