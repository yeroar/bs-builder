import React from "react";
import { View, StyleSheet, ViewStyle, Image } from "react-native";
import { colorMaps, spacing, radius } from "../tokens";

// Brand logo mappings
const BRAND_LOGOS: Record<string, any> = {
  chewy: require("../../assets/chewy.png"),
  walmart: require("../../assets/Wallmart.png"),
  walgreens: require("../../assets/Walgreens.png"),
  wayfair: require("../../assets/Wayfair.png"),
  wawa: require("../../assets/Wawa.png"),
  whbm: require("../../assets/WHBM.png"),
  wine: require("../../assets/Wine.com.png"),
  // Card brands
  visa: require("../../assets/cards/visa.png"),
  mastercard: require("../../assets/cards/masterCard.png"),
  amex: require("../../assets/cards/amEx.png"),
  chase: require("../../assets/cards/chase.png"),
  wellsfargo: require("../../assets/cards/wellsFargo.png"),
};

export type IconContainerVariant =
  | "default-fill"
  | "default-stroke"
  | "active"
  | "error"
  | "success";

export type IconContainerSize = "lg" | "md" | "sm" | "xs";

export interface IconContainerProps {
  icon?: React.ReactNode;
  brand?: string;
  variant?: IconContainerVariant;
  size?: IconContainerSize;
  style?: ViewStyle;
  testID?: string;
}

const SIZE_CONFIG = {
  lg: {
    size: 40,
    borderRadius: radius.lg,
    iconSize: 20,
  },
  md: {
    size: 36,
    borderRadius: radius.md,
    iconSize: 20,
  },
  sm: {
    size: 32,
    borderRadius: radius.md,
    iconSize: 16,
  },
  xs: {
    size: 20,
    borderRadius: radius.sm,
    iconSize: 12,
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
  brand,
  variant = "default-fill",
  size = "lg",
  style,
  testID,
}: IconContainerProps) {
  const sizeConfig = SIZE_CONFIG[size];
  const variantStyle = VARIANT_STYLES[variant];

  // Get brand logo if brand is provided
  const brandLogo = brand ? BRAND_LOGOS[brand.toLowerCase()] : null;

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeConfig.size,
          height: sizeConfig.size,
          borderRadius: sizeConfig.borderRadius,
          backgroundColor: brandLogo ? "transparent" : variantStyle.backgroundColor,
          borderWidth: brandLogo ? 0 : variantStyle.borderWidth,
          borderColor: brandLogo ? "transparent" : variantStyle.borderColor,
          overflow: "hidden",
        },
        style,
      ]}
      testID={testID}
    >
      {brandLogo ? (
        <Image
          source={brandLogo}
          style={{
            width: sizeConfig.size,
            height: sizeConfig.size,
            borderRadius: sizeConfig.borderRadius,
          }}
          resizeMode="cover"
        />
      ) : (
        icon
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
