import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../../tokens";

export interface ListItemProps {
  title: string;
  variant?: "giftCard" | "paymentMethod" | "feature" | "transaction" | "receipt" | "notifications";
  secondaryText?: string;
  tertiaryText?: string;
  rightTitle?: string;
  rightSecondaryText?: string;
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
  variant = "feature",
  secondaryText,
  tertiaryText,
  rightTitle,
  rightSecondaryText,
  leadingSlot,
  trailingSlot,
  chip,
  showDivider = false,
  disabled = false,
  onPress,
  style,
  testID,
}: ListItemProps) {
  const isPayment = variant === "paymentMethod";
  const isGiftCard = variant === "giftCard";
  const isFeature = variant === "feature";
  const isTransaction = variant === "transaction" || variant === "receipt";
  const isNotification = variant === "notifications";

  const getTextColor = (variantStyle: "primary" | "secondary" | "tertiary" | "accent" | "blue" | "positive") => {
    if (disabled) return colorMaps.face.disabled;
    switch (variantStyle) {
      case "primary": return colorMaps.face.primary;
      case "secondary": return colorMaps.face.secondary;
      case "tertiary": return colorMaps.face.tertiary;
      case "accent": return colorMaps.face.accentBold;
      case "blue": return colorMaps.face.accentBold;
      case "positive": return colorMaps.face.positiveBold;
      default: return colorMaps.face.primary;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled && styles.pressedContainer,
        style
      ]}
      testID={testID}
    >
      {({ pressed }) => (
        <>
          {/* Leading slot */}
          {(leadingSlot || isTransaction || isNotification) && (
            <View style={styles.leadingContainer}>
              {leadingSlot}
            </View>
          )}

          {/* Content area */}
          <View style={styles.content}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Main row with title and chip */}
              <View style={styles.titleRow}>
                <FoldText
                  type="body-md-bold"
                  style={{ color: getTextColor("primary") }}
                >
                  {title}
                </FoldText>
                {chip}
              </View>

              {/* Secondary text below title */}
              {secondaryText && (
                <FoldText
                  type={isGiftCard ? "body-md-bold" : "body-md"}
                  style={{
                    color: getTextColor(isGiftCard ? "blue" : (isNotification ? "tertiary" : "secondary"))
                  }}
                >
                  {secondaryText}
                </FoldText>
              )}

              {/* Tertiary text (below secondary, e.g. Gift Card) */}
              {isGiftCard && tertiaryText && (
                <FoldText type="body-md" style={{ color: getTextColor("secondary") }}>
                  {tertiaryText}
                </FoldText>
              )}

              {/* Tertiary text for Payment Method (accentBold/blue color) */}
              {isPayment && tertiaryText && (
                <FoldText type="body-md-bold" style={{ color: getTextColor("accent") }}>
                  {tertiaryText}
                </FoldText>
              )}
            </View>

            {/* Right Column (Transaction/Receipt variants or generic trailing slot) */}
            {isTransaction ? (
              <View style={styles.rightColumn}>
                {rightTitle && (
                  <View style={styles.rightTitleRow}>
                    <FoldText type="body-md-bold" style={{ color: getTextColor("primary") }}>
                      {rightTitle}
                    </FoldText>
                  </View>
                )}
                {rightSecondaryText && (
                  <FoldText type="body-md" style={{ color: getTextColor("secondary") }}>
                    {rightSecondaryText}
                  </FoldText>
                )}
              </View>
            ) : (
              <View style={styles.trailingContainer}>
                {trailingSlot}
              </View>
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
    backgroundColor: "transparent",
    position: "relative",
  },
  pressedContainer: {
    backgroundColor: colorMaps.object.tertiary.pressed,
    borderRadius: radius.lg,
  },
  leadingContainer: {
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
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
  rightColumn: {
    alignItems: "flex-end",
    flexDirection: "column",
    gap: spacing["50"],
  },
  rightTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
  },
  trailingContainer: {
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: spacing["400"],
    right: spacing["400"],
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
  },
});
