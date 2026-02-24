import React, { useMemo, useRef, useEffect } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
  Animated,
  Easing,
} from "react-native";
import { FoldText } from "../../FoldText";
import { colorMaps, spacing, radius } from "../../../tokens";
import SunIcon from "../../../Icons/SunIcon";

export type ButtonHierarchy = "primary" | "secondary" | "tertiary" | "inverse" | "destructive";
export type ButtonSize = "lg" | "md" | "sm" | "xs";

export interface ButtonProps {
  label?: string;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  /** Spin speed in ms for the loading icon */
  spinSpeed?: number;
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

/** Character delay for staggered animation (ms) */
const CHAR_STAGGER = 30;
/** Duration per character enter animation (ms) */
const CHAR_DURATION = 250;
/** Starting translateY offset for slide-down */
const CHAR_OFFSET = -16;

function StaggeredText({ text, color, textType }: { text: string; color: string; textType: string }) {
  const chars = Array.from(text);

  return (
    <View style={styles.staggeredRow}>
      {chars.map((char, i) => (
        <StaggeredChar key={`${i}-${char}`} char={char} index={i} color={color} textType={textType} />
      ))}
    </View>
  );
}

function StaggeredChar({ char, index, color, textType }: { char: string; index: number; color: string; textType: string }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(CHAR_OFFSET)).current;

  useEffect(() => {
    const delay = index * CHAR_STAGGER;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: CHAR_DURATION,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay,
        speed: 14,
        bounciness: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <FoldText type={textType} style={{ color }}>
        {char === " " ? "\u00A0" : char}
      </FoldText>
    </Animated.View>
  );
}

export default function Button({
  label,
  hierarchy = "primary",
  size = "md",
  disabled = false,
  loading = false,
  success = false,
  spinSpeed = 800,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  testID,
  numberOfLines,
}: ButtonProps) {
  const isDisabled = disabled || loading || success;
  const config = sizeConfig[size];
  const textType = size === "xs" ? "button-sm" : "button-lg";
  const textColor = useMemo(() => getTextColor(hierarchy, (loading || success) ? false : disabled), [hierarchy, disabled, loading, success]);
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
    if (!isDisabled) {
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

  // Separate layout props for the wrapper vs visual props for the pressable.
  // width/flex/alignSelf must go on the Animated.View wrapper because
  // the Pressable's "100%" is relative to its parent (Animated.View).
  const { width: styleWidth, flex: styleFlex, alignSelf: styleAlignSelf, ...visualStyle } = (style || {}) as ViewStyle;

  const wrapperStyle: ViewStyle = { transform: [{ scale: scaleAnim }] };
  if (styleWidth !== undefined) wrapperStyle.width = styleWidth;
  if (styleFlex !== undefined) wrapperStyle.flex = styleFlex;
  if (styleAlignSelf !== undefined) wrapperStyle.alignSelf = styleAlignSelf;

  const getStyle = ({ pressed }: PressableStateCallbackType): ViewStyle[] => [
    styles.container,
    containerStyle,
    { backgroundColor: getBackgroundColor(hierarchy, pressed, (loading || success) ? false : disabled) },
    ...(style ? [visualStyle] : []),
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <SunIcon
          spinning
          spinSpeed={spinSpeed}
          width={config.iconSize}
          height={config.iconSize}
          color={getTextColor(hierarchy, false)}
        />
      );
    }

    if (success && label) {
      return <StaggeredText text={label} color={getTextColor(hierarchy, false)} textType={textType} />;
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <Animated.View style={wrapperStyle}>
      <Pressable
        style={getStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        testID={testID}
      >
        {renderContent()}
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
    overflow: "hidden",
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
  staggeredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
