import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { colorMaps, spacing } from "../../../tokens";

export interface LeftColumnProps {
  primaryText?: string;
  secondaryText?: string;
  chip?: React.ReactNode;
  style?: ViewStyle;
}

export default function LeftColumn({
  primaryText,
  secondaryText,
  chip,
  style,
}: LeftColumnProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.primaryRow}>
        {primaryText && (
          <FoldText type="body-md-bold" style={styles.primaryText} numberOfLines={1}>
            {primaryText}
          </FoldText>
        )}
        {chip}
      </View>
      {secondaryText && (
        <FoldText type="body-md" style={styles.secondaryText} numberOfLines={1}>
          {secondaryText}
        </FoldText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  primaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["150"],
    height: 20,
  },
  primaryText: {
    color: colorMaps.face.primary,
    flexShrink: 1,
  },
  secondaryText: {
    color: colorMaps.face.secondary,
  },
});
