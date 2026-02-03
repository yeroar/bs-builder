import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorMaps, radius } from "../tokens";

export interface ProgressBarProps {
  progress?: number; // 0-100
  style?: ViewStyle;
}

export default function ProgressBar({
  progress = 0,
  style,
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.track, style]}>
      <View
        style={[
          styles.fill,
          { width: `${clampedProgress}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    width: "100%",
    backgroundColor: colorMaps.object.secondary.default,
    borderRadius: radius.rounded,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: colorMaps.object.primary.bold.default,
    borderRadius: radius.rounded,
    minWidth: 6,
  },
});
