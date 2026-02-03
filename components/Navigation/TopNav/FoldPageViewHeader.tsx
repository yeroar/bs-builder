import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FoldText } from "../../Primitives/FoldText";
import FoldPressable from "../../Primitives/FoldPressable";
import { colorMaps, spacing } from "../../tokens";
import StackControl from "./StackControl";
import { XCloseIcon } from "../../Icons/XCloseIcon";
import { MenuIcon } from "../../Icons/MenuIcon";
import { ChevronLeftIcon } from "../../Icons/ChevronLeftIcon";
import ProgressIndicator from "../../dataViz/ProgressIndicator";

const TOKENS = {
  colors: {
    default: colorMaps.object.primary.bold.default,
    pressed: colorMaps.object.primary.bold.pressed,
    secondaryDefault: colorMaps.object.secondary.default,
    secondaryPressed: colorMaps.object.secondary.pressed,
    disabled: colorMaps.object.disabled.disabled,
    textPrimary: colorMaps.face.primary,
    textDisabled: colorMaps.face.disabled,
  },
};

interface FoldPageViewHeaderProps {
  title?: string;
  subTitle?: string;
  leftIcon?: string | "back" | "menu" | "x" | "chevron-left";
  rightIcon?: string | "x";
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  rightIconColor?: string;
  titleColor?: string;
  titleType?: string;
  style?: StyleProp<ViewStyle>;
  variant?: "root" | "fullscreen" | "progressive";
  rightComponents?: React.ReactNode[];
  marginBottom?: number;
  step?: React.ReactNode;
  showHeader?: boolean;
}

const HEADER_HEIGHT = 48;

export default function FoldPageViewHeader({
  title,
  subTitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  leftComponent,
  rightComponent,
  backgroundColor,
  rightIconColor,
  titleColor,
  titleType = "header-xxs",
  style,
  variant = "fullscreen",
  rightComponents = [],
  marginBottom = 24,
  step,
  showHeader = true,
}: FoldPageViewHeaderProps) {
  const insets = useSafeAreaInsets();
  const headerTextColor = titleColor || TOKENS.colors.textPrimary;

  if (!showHeader) {
    return null;
  }

  const displayRightComponents =
    variant === "root" ? (rightComponents || []).slice(0, 3) : [];

  const renderLeftIcon = () => {
    if (leftIcon === "menu") return <MenuIcon />;
    if (leftIcon === "back" || leftIcon === "chevron-left") return <ChevronLeftIcon />;
    return <XCloseIcon />;
  };

  const renderRightIcon = () => {
    return <XCloseIcon />;
  };

  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: backgroundColor || "transparent",
          height: HEADER_HEIGHT + insets.top,
          paddingTop: insets.top,
          marginBottom: marginBottom,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left side */}
        <View style={styles.leftSide}>
          {leftComponent
            ? leftComponent
            : (leftIcon || variant === "root" || variant === "fullscreen") && (
              <StackControl
                variant="left"
                onLeftPress={onLeftPress}
                leadingSlot={
                  leftIcon === "menu" || (variant === "root" && !leftIcon) ? (
                    <MenuIcon />
                  ) : leftIcon === "back" || leftIcon === "chevron-left" || (variant === "fullscreen" && !leftIcon) ? (
                    <ChevronLeftIcon />
                  ) : (
                    <XCloseIcon />
                  )
                }
              />
            )}
        </View>

        {/* Progress indicator - between left and right */}
        {step && (
          <View style={styles.progressContainer}>
            {step}
          </View>
        )}

        {/* Center - absolutely positioned to center of screen */}
        <View style={[styles.center]}>
          <View style={{ alignItems: "center" }}>
            <FoldText
              type={titleType}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlign: "center",
                color: headerTextColor,
              }}
            >
              {title || ""}
            </FoldText>
            {subTitle && (
              <FoldText
                type={titleType}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  textAlign: "center",
                  color: colorMaps.face.secondary,
                  marginTop: -2,
                }}
              >
                {subTitle}
              </FoldText>
            )}
          </View>
        </View>

        {/* Right side - different layout based on variant */}
        <View style={styles.rightSide}>
          {rightComponents.length > 0 ? (
            <View style={styles.multipleIconsContainer}>
              {rightComponents.map((component, index) => (
                <View key={index} style={styles.iconWrapper}>
                  {component}
                </View>
              ))}
            </View>
          ) : rightComponent ? (
            rightComponent
          ) : (
            rightIcon && (
              <StackControl
                variant="right"
                onRightPress={onRightPress}
                trailingSlot={<XCloseIcon />}
              />
            )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: spacing[500],
  },
  leftSide: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 1,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  rightSide: {
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: "auto",
    zIndex: 1,
  },
  multipleIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["400"],
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[400],
  },
});
