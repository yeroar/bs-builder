import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing } from "../tokens";

export type ChipType = "primary" | "accent" | "success";

export interface ChipProps {
  label: string;
  type?: ChipType;
  bold?: boolean;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Chip({
  label,
  type = "primary",
  bold = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
}: ChipProps) {
  const getColors = () => {
    switch (type) {
      case "accent":
        return bold
          ? { bg: colorMaps.object.accent.bold.default, text: colorMaps.face.accentSubtle }
          : { bg: colorMaps.object.accent.subtle.default, text: colorMaps.face.accentBold };
      case "success":
        return bold
          ? { bg: colorMaps.object.positive.bold.default, text: colorMaps.face.positiveSubtle }
          : { bg: colorMaps.object.positive.subtle.default, text: colorMaps.face.positiveBold };
      case "primary":
      default:
        return bold
          ? { bg: colorMaps.object.primary.bold.default, text: colorMaps.face.primary }
          : { bg: colorMaps.object.primary.subtle.default, text: colorMaps.face.primary };
    }
  };

  const { bg, text } = getColors();

  const content = (
    <View style={[styles.container, { backgroundColor: bg }, style]}>
      {leadingSlot && <View style={styles.slot}>{leadingSlot}</View>}
      <FoldText type="body-sm-bold" style={{ color: text }}>
        {label}
      </FoldText>
      {trailingSlot && <View style={styles.slot}>{trailingSlot}</View>}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    paddingHorizontal: spacing["200"],
    borderRadius: 4,
    flexDirection: "row",
    gap: spacing["100"],
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  slot: {
    justifyContent: "center",
    alignItems: "center",
  },
});
