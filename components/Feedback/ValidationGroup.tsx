import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../tokens";

export interface ValidationGroupProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function ValidationGroup({
  children,
  style,
}: ValidationGroupProps) {
  if (!children) return null;

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["100"],
    width: "100%",
  },
});
