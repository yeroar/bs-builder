import React, { useMemo } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../tokens";

export type ButtonHierarchy = "primary" | "secondary" | "tertiary" | "inverse" | "destructive";
export type ButtonSize = "lg" | "md" | "sm" | "xs";

export interface ButtonProps {
  label: string;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  disabled?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const sizeConfig = {
  lg: { height: 56, paddingHorizontal: spacing["500"], borderRadius: radius.lg, iconSize: 24 },
  md: { height: 48, paddingHorizontal: spacing["400"], borderRadius: radius.md, iconSize: 24 },
  sm: { height: 40, paddingHorizontal: spacing["300"], borderRadius: radius.md, iconSize: 19 },
  xs: { height: 36, paddingHorizontal: spacing["200"], borderRadius: radius.md, iconSize: 19 },
} as const;

function getBackgroundColor(hierarchy: ButtonHierarchy, pressed: boolean, disabled: boolean): string {
  if (disabled) {
    return hierarchy === "tertiary"
      ? "transparent"
      : colorMaps.object.disabled.disabled;
  }

  switch (hierarchy) {
    case "primary":
      return pressed
        ? colorMaps.object.primary.bold.pressed
        : colorMaps.object.primary.bold.default;
    case "secondary":
      return pressed
        ? colorMaps.object.secondary.pressed
        : colorMaps.object.secondary.default;
    case "tertiary":
      return pressed
        ? colorMaps.object.tertiary.pressed
        : colorMaps.object.tertiary.default;
    case "inverse":
      return pressed
        ? colorMaps.object.inverse.pressed
        : colorMaps.object.inverse.default;
    case "destructive":
      return pressed
        ? colorMaps.object.negative.bold.pressed
        : colorMaps.object.negative.bold.default;
  }
}

function getTextColor(hierarchy: ButtonHierarchy, disabled: boolean): string {
  if (disabled) {
    return colorMaps.face.disabled;
  }
  switch (hierarchy) {
    case "inverse":
      return colorMaps.face.inversePrimary;
    case "destructive":
      return colorMaps.face.negativeSubtle;
    default:
      return colorMaps.face.primary;
  }
}

export default function Button({
  label,
  hierarchy = "primary",
  size = "lg",
  disabled = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  testID,
}: ButtonProps) {
  const config = sizeConfig[size];
  const textType = size === "xs" ? "button-sm" : "button-lg";
  const textColor = useMemo(() => getTextColor(hierarchy, disabled), [hierarchy, disabled]);

  const containerStyle = useMemo(
    () => ({
      height: config.height,
      paddingHorizontal: config.paddingHorizontal,
      borderRadius: config.borderRadius,
    }),
    [config]
  );

  const getStyle = ({ pressed }: PressableStateCallbackType): ViewStyle[] => [
    styles.container,
    containerStyle,
    { backgroundColor: getBackgroundColor(hierarchy, pressed, disabled) },
    style as ViewStyle,
  ];

  return (
    <Pressable
      style={getStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      {({ pressed }) => (
        <>
          {leadingSlot && (
            <View style={styles.iconWrapper}>{leadingSlot}</View>
          )}

          <View style={styles.textWrapper}>
            <FoldText type={textType} style={{ color: textColor }}>
              {label}
            </FoldText>
          </View>

          {trailingSlot && (
            <View style={styles.iconWrapper}>{trailingSlot}</View>
          )}

          {pressed && !disabled && (
            <View style={[styles.focusRing, { borderRadius: config.borderRadius + 2 }]} />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["100"],
    position: "relative",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    paddingHorizontal: spacing["100"],
    justifyContent: "center",
    alignItems: "center",
  },
  focusRing: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderColor: colorMaps.border.focused,
    pointerEvents: "none",
  },
});
