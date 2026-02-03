import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { colorMaps } from "../../../tokens";

export interface RightColumnProps {
  primaryText?: string;
  secondaryText?: string;
  chip?: React.ReactNode;
  style?: ViewStyle;
}

export default function RightColumn({
  primaryText,
  secondaryText,
  chip,
  style,
}: RightColumnProps) {
  return (
    <View style={[styles.container, style]}>
      {chip}
      {primaryText && (
        <FoldText type="body-md-bold" style={styles.primaryText}>
          {primaryText}
        </FoldText>
      )}
      {secondaryText && (
        <FoldText type="body-md" style={styles.secondaryText}>
          {secondaryText}
        </FoldText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  primaryText: {
    color: colorMaps.face.primary,
    textAlign: "right",
  },
  secondaryText: {
    color: colorMaps.face.secondary,
    textAlign: "right",
  },
});
