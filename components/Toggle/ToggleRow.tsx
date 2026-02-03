import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import Toggle from "./Toggle";
import { colorMaps, spacing, radius } from "../tokens";

export interface ToggleRowProps {
  header: string;
  description?: string;
  isSelected?: boolean;
  onToggle?: (value: boolean) => void;
  hasDiv?: boolean;
  leadingSlot?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function ToggleRow({
  header,
  description,
  isSelected = false,
  onToggle,
  hasDiv = true,
  leadingSlot,
  disabled = false,
  style,
  testID,
}: ToggleRowProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {/* Leading icon container */}
      {leadingSlot && (
        <View style={styles.iconContainer}>
          {leadingSlot}
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {/* Text column */}
        <View style={styles.textColumn}>
          <FoldText type="body-md-bold" style={styles.header}>
            {header}
          </FoldText>
          {description && (
            <FoldText type="body-md" style={styles.description}>
              {description}
            </FoldText>
          )}
        </View>

        {/* Toggle */}
        <Toggle
          value={isSelected}
          onValueChange={onToggle}
          disabled={disabled}
        />
      </View>

      {/* Divider */}
      {hasDiv && <View style={styles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    paddingVertical: spacing["500"],
    backgroundColor: colorMaps.object.tertiary.default,
    position: "relative",
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    borderRadius: radius.lg,
    backgroundColor: colorMaps.object.tertiary.default,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  textColumn: {
    flex: 1,
    gap: spacing["50"],
  },
  header: {
    color: colorMaps.face.primary,
  },
  description: {
    color: colorMaps.face.secondary,
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
  },
});
