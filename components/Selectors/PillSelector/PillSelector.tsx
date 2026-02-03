import React from "react";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface PillSelectorProps {
  label: string;
  isActive?: boolean;
  variant?: "onLight" | "onBrand" | "transparent";
  size?: "md" | "sm";
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function PillSelector({
  label,
  isActive = false,
  variant = "onLight",
  size = "md",
  onPress,
  disabled = false,
  style,
  testID,
}: PillSelectorProps) {
  const isOnLight = variant === "onLight";
  const isMd = size === "md";

  const getContainerStyle = (pressed: boolean) => {
    if (variant === "onLight") {
      if (isActive) {
        return styles.containerOnLightActive;
      }
      return pressed
        ? styles.containerOnLightPressed
        : styles.containerOnLightDefault;
    } else if (variant === "onBrand") {
      if (isActive) {
        return styles.containerOnBrandActive;
      }
      return pressed
        ? styles.containerOnBrandPressed
        : styles.containerOnBrandDefault;
    } else {
      // transparent
      return null;
    }
  };

  const getTextStyle = () => {
    if (isOnLight && !isActive) {
      return styles.textDisabled;
    }
    return styles.textPrimary;
  };

  const textType = isActive || variant !== "onLight"
    ? (isMd ? "body-md-bold" : "body-sm-bold")
    : (isMd ? "body-md" : "body-sm");

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        isMd ? styles.containerMd : styles.containerSm,
        getContainerStyle(pressed),
        style,
      ]}
      testID={testID}
    >
      <FoldText type={textType} style={getTextStyle()}>
        {label}
      </FoldText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["200"],
  },
  containerMd: {
    // md size uses default padding
  },
  containerSm: {
    // sm size uses same padding but smaller text
  },
  // OnLight variants
  containerOnLightDefault: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    borderRadius: 100,
  },
  containerOnLightPressed: {
    backgroundColor: colorMaps.object.tertiary.pressed,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    borderRadius: 100,
  },
  containerOnLightActive: {
    backgroundColor: colorMaps.object.tertiary.selected,
    borderRadius: radius.xl + 8, // 24px
  },
  // OnBrand variants
  containerOnBrandDefault: {
    backgroundColor: colorMaps.object.primary.bold.selected,
    borderRadius: 100,
  },
  containerOnBrandPressed: {
    backgroundColor: colorMaps.object.primary.subtle.pressed,
    borderRadius: 100,
  },
  containerOnBrandActive: {
    backgroundColor: colorMaps.object.primary.bold.pressed,
    borderRadius: radius.xl + 8, // 24px
  },
  // Text styles
  textDisabled: {
    color: colorMaps.face.disabled,
  },
  textPrimary: {
    color: colorMaps.face.primary,
  },
});
