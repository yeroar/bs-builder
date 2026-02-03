import React from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { spacing, colorMaps } from "../../../tokens";

export interface SearchHeaderProps {
  title: React.ReactNode;
  actionLabel?: React.ReactNode;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export default function SearchHeader({
  title,
  actionLabel,
  onActionPress,
  style,
}: SearchHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <FoldText type="header-xs" style={styles.title}>
        {title}
      </FoldText>

      {actionLabel && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <FoldText type="body-sm-bold" style={styles.action}>
            {actionLabel}
          </FoldText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["100"],
    width: "100%",
  },
  title: {
    color: colorMaps.face.primary,
    flex: 1,
  },
  action: {
    color: colorMaps.face.primary,
    textDecorationLine: "underline",
  },
});
