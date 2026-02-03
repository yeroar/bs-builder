import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../tokens";

export interface ComponentCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  style?: ViewStyle;
}

export default function ComponentCard({
  title,
  description,
  children,
  controls,
  style,
}: ComponentCardProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <FoldText type="body-md-bold" style={styles.title}>
          {title}
        </FoldText>
        {description && (
          <FoldText type="body-sm" style={styles.description}>
            {description}
          </FoldText>
        )}
      </View>

      {/* Preview */}
      <View style={styles.preview}>
        {children}
      </View>

      {/* Controls */}
      {controls && (
        <View style={styles.controls}>
          {controls}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.special.offWhite,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    overflow: "hidden",
  },
  header: {
    padding: spacing["400"],
    borderBottomWidth: 1,
    borderBottomColor: colorMaps.border.tertiary,
    gap: spacing["100"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  description: {
    color: colorMaps.face.secondary,
  },
  preview: {
    padding: spacing["400"],
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    backgroundColor: colorMaps.layer.background,
  },
  controls: {
    padding: spacing["400"],
    borderTopWidth: 1,
    borderTopColor: colorMaps.border.tertiary,
    backgroundColor: colorMaps.special.offWhite,
  },
});
