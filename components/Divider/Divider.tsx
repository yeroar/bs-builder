import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorMaps, spacing } from "../tokens";

export interface DividerProps {
  inset?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function Divider({ inset = false, style, testID }: DividerProps) {
  return <View style={[styles.divider, inset && styles.inset, style]} testID={testID} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
    width: "100%",
  },
  inset: {
    marginHorizontal: spacing["500"],
    width: "auto",
  },
});
