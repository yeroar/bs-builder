import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../tokens";

export type TextColorVariant = "primary" | "secondary" | "tertiary" | "accent";

export interface ListItemProps {
  title: string;
  variant?: "giftCard" | "paymentmethod";
  secondaryText?: string;
  tertiaryText?: string;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  chip?: React.ReactNode;
  showDivider?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function ListItem({
  title,
  variant = "giftCard",
  secondaryText,
  tertiaryText,
  leadingSlot,
  trailingSlot,
  chip,
  showDivider = false,
  disabled = false,
  onPress,
  style,
  testID,
}: ListItemProps) {
  const isPayment = variant === "paymentmethod";
  const isGiftCard = variant === "giftCard";

  const getTextColor = (variantStyle: "primary" | "secondary" | "tertiary" | "accent") => {
    if (disabled) return colorMaps.face.disabled;
    switch (variantStyle) {
      case "primary": return colorMaps.face.primary;
      case "secondary": return colorMaps.face.secondary;
      case "tertiary": return colorMaps.face.tertiary;
      case "accent": return colorMaps.face.accentBold;
      default: return colorMaps.face.primary;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [styles.container, style]}
      testID={testID}
    >
      {({ pressed }) => (
        <>
          {/* Pressed overlay */}
          {pressed && !disabled && <View style={styles.pressedOverlay} />}

          {/* Leading slot */}
          {leadingSlot}

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.leftColumn}>
              {/* Secondary text (on top for payment variant) */}
              {isPayment && secondaryText && (
                <FoldText
                  type="body-md"
                  style={{ color: getTextColor("secondary") }}
                >
                  {secondaryText}
                </FoldText>
              )}

              {/* Title row with optional chip */}
              <View style={styles.titleRow}>
                <FoldText
                  type="body-md-bold"
                  style={{ color: getTextColor("primary") }}
                >
                  {title}
                </FoldText>
                {chip}
              </View>

              {/* Secondary text (below for giftCard variant) */}
              {isGiftCard && secondaryText && (
                <FoldText
                  type="body-md-bold"
                  style={{ color: getTextColor("accent") }}
                >
                  {secondaryText}
                </FoldText>
              )}

              {/* Tertiary text */}
              {tertiaryText && (
                <FoldText
                  type={isGiftCard ? "body-md-bold" : "body-md"}
                  style={{ color: getTextColor(isGiftCard ? "tertiary" : "accent") }}
                >
                  {tertiaryText}
                </FoldText>
              )}
            </View>

            {/* Trailing slot */}
            {trailingSlot !== undefined ? (
              trailingSlot
            ) : (
              <ChevronRightIcon
                width={30}
                height={30}
                color={colorMaps.face.primary}
              />
            )}
          </View>

          {/* Divider */}
          {showDivider && <View style={styles.divider} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing["400"],
    gap: spacing["300"],
    backgroundColor: colorMaps.object.tertiary.default,
    position: "relative",
  },
  pressedOverlay: {
    position: "absolute",
    top: 4,
    left: -12,
    right: -12,
    bottom: 4,
    backgroundColor: colorMaps.object.tertiary.pressed,
    borderRadius: radius.lg,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  leftColumn: {
    flex: 1,
    flexDirection: "column",
    gap: spacing["50"],
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["150"],
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colorMaps.border.secondary,
  },
});
