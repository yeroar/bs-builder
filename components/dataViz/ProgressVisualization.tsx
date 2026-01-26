import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing } from "../tokens";
import ProgressBar from "./ProgressBar";

export interface ProgressVisualizationProps {
  progress?: number; // 0-100
  leftText?: string;
  rightText?: string;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
}

export default function ProgressVisualization({
  progress = 0,
  leftText,
  rightText,
  leadingSlot,
  trailingSlot,
  children,
  style,
}: ProgressVisualizationProps) {
  return (
    <View style={[styles.container, style]}>
      {children || <ProgressBar progress={progress} />}

      <View style={styles.labels}>
        {/* Left label */}
        <View style={styles.leftLabel}>
          {leftText && (
            <FoldText type="body-sm" style={styles.labelText}>
              {leftText}
            </FoldText>
          )}
          {leadingSlot}
        </View>

        {/* Right label */}
        <View style={styles.rightLabel}>
          {rightText && (
            <FoldText type="body-sm" style={styles.labelText}>
              {rightText}
            </FoldText>
          )}
          {trailingSlot}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing["200"],
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftLabel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
  },
  rightLabel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: spacing["100"],
  },
  labelText: {
    color: colorMaps.face.secondary,
  },
});
