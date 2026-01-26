import React, { useMemo } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { ArrowNarrowLeftIcon } from "../icons/ArrowNarrowLeftIcon";
import { colorMaps, radius } from "../tokens";

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
  lg: { size: 56, borderRadius: radius.lg, iconSize: 24 },
  md: { size: 48, borderRadius: radius.md, iconSize: 24 },
  sm: { size: 40, borderRadius: radius.md, iconSize: 20 },
  xs: { size: 36, borderRadius: radius.md, iconSize: 20 },
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
  size = "lg",
  disabled = false,
  icon,
  onPress,
  style,
  testID,
}: IconOnlyProps) {
  const config = sizeConfig[size];
  const iconColor = useMemo(() => getIconColor(hierarchy, disabled), [hierarchy, disabled]);

  const containerStyle = useMemo(
    () => ({
      width: config.size,
      height: config.size,
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
    <Pressable
      style={getStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      {({ pressed }) => (
        <>
          <View style={styles.iconWrapper}>{renderedIcon}</View>

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
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconWrapper: {
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
