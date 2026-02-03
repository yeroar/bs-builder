import React, { useMemo, useRef } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
  Animated,
} from "react-native";
import { ArrowNarrowLeftIcon } from "../../../Icons/ArrowNarrowLeftIcon";
import { colorMaps, radius, spacing } from "../../../tokens";

export type IconOnlyHierarchy = "primary" | "secondary" | "tertiary" | "inverse";
export type IconOnlySize = "lg" | "md" | "sm" | "xs";

export interface IconOnlyProps {
  hierarchy?: IconOnlyHierarchy;
  size?: IconOnlySize;
  disabled?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const sizeConfig = {
  lg: { size: spacing["1400"], borderRadius: radius.lg, iconSize: 20 },
  md: { size: spacing["1200"], borderRadius: radius.md, iconSize: 20 },
  sm: { size: spacing["1000"], borderRadius: radius.md, iconSize: 20 },
  xs: { size: spacing["800"], borderRadius: radius.md, iconSize: 16 },
} as const;

function getBackgroundColor(hierarchy: IconOnlyHierarchy, pressed: boolean, disabled: boolean): string {
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
  }
}

function getIconColor(hierarchy: IconOnlyHierarchy, disabled: boolean): string {
  if (disabled) {
    return colorMaps.face.disabled;
  }
  return hierarchy === "inverse"
    ? colorMaps.face.inversePrimary
    : colorMaps.face.primary;
}

export default function IconOnly({
  hierarchy = "primary",
  size = "md",
  disabled = false,
  icon,
  onPress,
  style,
  testID,
}: IconOnlyProps) {
  const config = sizeConfig[size];
  const iconColor = useMemo(() => getIconColor(hierarchy, disabled), [hierarchy, disabled]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const containerStyle = useMemo(
    () => ({
      width: config.size,
      height: config.size,
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

  // If icon is a function (component), render it; otherwise, render as is.
  // But usually we expect an element or a component.
  // We'll clone it to inject props if it's a valid element, or just render it.
  // Actually, for iconography consistency, we might want to enforce size/color if we can.
  // But if the user passes a fully formed element, we should respect it, OR clone with new props.
  // The 'icon' prop in similar libs often takes a ReactNode.

  const renderedIcon = useMemo(() => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        width: config.iconSize,
        height: config.iconSize,
        color: iconColor,
      });
    }
    // Default fallback
    if (!icon) {
      return <ArrowNarrowLeftIcon width={config.iconSize} height={config.iconSize} color={iconColor} />;
    }
    return icon;
  }, [icon, config.iconSize, iconColor]);


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
        <View style={styles.iconWrapper}>{renderedIcon}</View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
