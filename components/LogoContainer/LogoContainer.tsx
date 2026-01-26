import React from "react";
import { View, StyleSheet, ViewStyle, Image, ImageSourcePropType } from "react-native";
import { colorMaps, spacing, radius } from "../tokens";

export type LogoContainerSize = "lg" | "md" | "sm";

export interface LogoContainerProps {
  brand?: string;
  size?: LogoContainerSize;
  style?: ViewStyle;
  testID?: string;
}

const BRAND_LOGOS: Record<string, ImageSourcePropType> = {
  Walmart: require("../../assets/Walmart.png"),
  Chewy: require("../../assets/chewy.png"),
};

const PLACEHOLDER = require("../../assets/placeholder.png");

const SIZE_CONFIG = {
  lg: {
    size: 44,
    borderRadius: radius.lg,
    imageSize: 32,
  },
  md: {
    size: 40,
    borderRadius: radius.md,
    imageSize: 28,
  },
  sm: {
    size: 32,
    borderRadius: radius.md,
    imageSize: 24,
  },
} as const;

export default function LogoContainer({
  brand,
  size = "lg",
  style,
  testID,
}: LogoContainerProps) {
  const config = SIZE_CONFIG[size];
  const source = (brand && BRAND_LOGOS[brand]) || PLACEHOLDER;

  return (
    <View
      style={[
        styles.container,
        {
          width: config.size,
          height: config.size,
          borderRadius: config.borderRadius,
        },
        style,
      ]}
      testID={testID}
    >
      <Image
        source={source}
        style={{ width: config.imageSize, height: config.imageSize }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorMaps.object.tertiary.default,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    overflow: "hidden",
  },
});
