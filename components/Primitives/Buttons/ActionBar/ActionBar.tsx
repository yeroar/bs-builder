import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../../../tokens";

export interface ActionBarProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function ActionBar({ children, style }: ActionBarProps) {
  const childCount = React.Children.count(children);

  return (
    <View style={[styles.container, childCount === 1 && styles.singleButton, style]}>
      {React.Children.map(children, (child, index) => (
        <View key={index} style={styles.buttonWrapper}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing["300"],
    width: "100%",
  },
  singleButton: {
    gap: spacing["none"],
  },
  buttonWrapper: {
    flex: 1,
  },
});
