import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorMaps, radius } from "../tokens";

export interface SelectionRowGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export default function SelectionRowGroup({
  children,
  style,
  testID,
}: SelectionRowGroupProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
});
