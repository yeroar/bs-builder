import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { InfoCircleIcon } from "../../icons/InfoCircleIcon";
import { AlertCircleIcon } from "../../icons/AlertCircleIcon";
import { colorMaps, spacing } from "../../tokens";

export type FootnoteType = "error" | "info";

export interface FootnoteProps {
  type?: FootnoteType;
  message: string;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function Footnote({
  type = "error",
  message,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  testID,
}: FootnoteProps) {
  const isError = type === "error";
  const textColor = isError ? colorMaps.face.negativeBold : colorMaps.face.secondary;
  const iconColor = isError ? colorMaps.face.negativeBold : colorMaps.face.tertiary;
  
  const IconComponent = isError ? AlertCircleIcon : InfoCircleIcon;

  const content = (
    <View style={[styles.container, style]} testID={testID}>
      {/* Leading Icon / Slot */}
      {leadingSlot !== undefined ? (
        leadingSlot && <View style={styles.iconContainer}>{leadingSlot}</View>
      ) : (
        <View style={styles.iconContainer}>
          <IconComponent width={12} height={12} color={iconColor} />
        </View>
      )}

      {/* Text Content */}
      <FoldText 
        type="body-sm" 
        style={[styles.text, { color: textColor }]}
        numberOfLines={1}
      >
        {message}
      </FoldText>

      {/* Trailing Icon / Slot */}
      {trailingSlot !== undefined ? (
        trailingSlot && <View style={styles.iconContainer}>{trailingSlot}</View>
      ) : null}
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["150"],
    height: 16,
  },
  iconContainer: {
    width: spacing["300"],
    height: spacing["300"],
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // flexShrink: 1 allows the text to wrap if it's too long, 
    // but prevents it from growing to push away trailing icons.
    flexShrink: 1,
  },
});
