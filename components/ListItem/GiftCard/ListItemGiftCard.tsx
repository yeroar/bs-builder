import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing } from "../../tokens";

export interface ListItemGiftCardProps {
  title: string;
  secondaryText: string;
  tertiaryText?: string;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  chip?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function ListItemGiftCard({
  title,
  secondaryText,
  tertiaryText,
  leadingSlot,
  trailingSlot,
  chip,
  disabled = false,
  onPress,
  style,
  testID,
}: ListItemGiftCardProps) {
  const content = (
    <>
      {leadingSlot && <View style={styles.leadingSlot}>{leadingSlot}</View>}

      <View style={styles.content}>
        <View style={styles.leftColumn}>
          {/* Title with optional chip */}
          <View style={styles.titleRow}>
            <FoldText type="body-md-bold" style={styles.title}>
              {title}
            </FoldText>
            {chip && <View style={styles.chipContainer}>{chip}</View>}
          </View>

          {/* Secondary text (cashback in accent blue) */}
          <FoldText type="body-md-bold" style={styles.secondaryText}>
            {secondaryText}
          </FoldText>

          {/* Tertiary text (availability) */}
          {tertiaryText && (
            <FoldText type="body-md-bold" style={styles.tertiaryText}>
              {tertiaryText}
            </FoldText>
          )}
        </View>

        {trailingSlot && (
          <View style={styles.trailingSlot}>{trailingSlot}</View>
        )}
      </View>
    </>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
          style,
        ]}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    paddingVertical: spacing["400"],
    backgroundColor: colorMaps.object.tertiary.default,
  },
  containerPressed: {
    backgroundColor: colorMaps.object.tertiary.pressed,
  },
  leadingSlot: {
    flexShrink: 0,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  leftColumn: {
    flex: 1,
    gap: 0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing["150"],
  },
  title: {
    color: colorMaps.face.primary,
    lineHeight: 20,
  },
  chipContainer: {
    flexShrink: 0,
  },
  secondaryText: {
    color: colorMaps.face.accentBold,
    lineHeight: 20,
  },
  tertiaryText: {
    color: colorMaps.face.tertiary,
    lineHeight: 20,
  },
  trailingSlot: {
    flexShrink: 0,
  },
});
