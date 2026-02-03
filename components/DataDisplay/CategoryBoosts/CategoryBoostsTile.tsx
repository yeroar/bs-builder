import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface CategoryBoostsTileProps {
  title: string;
  secondaryText?: string;
  tertiaryText?: string;
  leadingSlot?: React.ReactNode;
  variant?: "horizontal" | "vertical";
  style?: ViewStyle;
  testID?: string;
}

export default function CategoryBoostsTile({
  title,
  secondaryText,
  tertiaryText,
  leadingSlot,
  variant = "horizontal",
  style,
  testID,
}: CategoryBoostsTileProps) {
  const isVertical = variant === "vertical";

  return (
    <View
      style={[
        styles.container,
        isVertical ? styles.containerVertical : styles.containerHorizontal,
        style,
      ]}
      testID={testID}
    >
      {/* Leading Slot Section */}
      {leadingSlot && (
        <View style={styles.iconWrapper}>
          {leadingSlot}
        </View>
      )}

      {/* Content Section */}
      <View style={[styles.content, isVertical && styles.contentVertical]}>
        <FoldText type="body-md-bold" style={styles.title}>
          {title}
        </FoldText>
        {secondaryText && (
          <FoldText type="body-sm-bold" style={styles.secondaryText}>
            {secondaryText}
          </FoldText>
        )}
        {tertiaryText && (
          <FoldText type="body-sm" style={styles.tertiaryText}>
            {tertiaryText}
          </FoldText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderWidth: 0.5,
    borderColor: colorMaps.border.tertiary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["500"],
    // Shadow based on Figma effects
    shadowColor: colorMaps.face.tertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  containerHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    width: 331,
    minHeight: 96,
  },
  containerVertical: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing["1200"], // 48px gap from Figma
    width: 162,
    minHeight: 184,
  },
  iconWrapper: {
    // Styling for icon container if needed
  },
  content: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  contentVertical: {
    width: "100%",
  },
  title: {
    color: colorMaps.face.primary,
  },
  secondaryText: {
    color: colorMaps.face.accentBold, // #06f
  },
  tertiaryText: {
    color: colorMaps.face.tertiary,
  },
});
