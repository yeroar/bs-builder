import React, { useMemo, useRef } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
  Animated,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

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
  numberOfLines?: number;
}

const sizeConfig = {
  lg: { height: spacing["1400"], paddingHorizontal: spacing["500"], borderRadius: radius.lg, iconSize: 20 },
  md: { height: spacing["1200"], paddingHorizontal: spacing["400"], borderRadius: radius.md, iconSize: 20 },
  sm: { height: spacing["1000"], paddingHorizontal: spacing["300"], borderRadius: radius.md, iconSize: 20 },
  xs: { height: spacing["800"], paddingHorizontal: spacing["200"], borderRadius: radius.md, iconSize: 16 },
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
      return colorMaps.face.inversePrimary;
    default:
      return colorMaps.face.primary;
  }
}

export default function Button({
  label,
  hierarchy = "primary",
  size = "md",
  disabled = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  testID,
  numberOfLines,
}: ButtonProps) {
  const config = sizeConfig[size];
  const textType = size === "xs" ? "button-sm" : "button-lg";
  const textColor = useMemo(() => getTextColor(hierarchy, disabled), [hierarchy, disabled]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const containerStyle = useMemo(
    () => ({
      height: config.height,
      paddingHorizontal: config.paddingHorizontal,
      borderRadius: config.borderRadius,
    }),
    [config]
  );

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    }
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const getStyle = ({ pressed }: PressableStateCallbackType): ViewStyle[] => [
    styles.container,
    containerStyle,
    { backgroundColor: getBackgroundColor(hierarchy, pressed, disabled) },
    style as ViewStyle,
  ];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={getStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        testID={testID}
      >
        {leadingSlot && (
          <View style={styles.iconWrapper}>{leadingSlot}</View>
        )}

        <View style={styles.textWrapper}>
          <FoldText type={textType} style={{ color: textColor }} numberOfLines={numberOfLines}>
            {label}
          </FoldText>
        </View>

        {trailingSlot && (
          <View style={styles.iconWrapper}>{trailingSlot}</View>
        )}
      </Pressable>
    </Animated.View>
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
});
