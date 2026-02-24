import React from "react";
import { View, StyleSheet, Pressable, type ViewStyle } from "react-native";
import { colorMaps, spacing, radius } from "../../tokens";
import { InstacartIcon } from "../../Icons/InstacartIcon";
import { FoldLogoIcon } from "../../Icons/FoldLogoIcon";
import Chip from "../../Primitives/Chip/Chip";

export interface GiftCardTemplateProps {
  brandName?: string;
  chipLabel?: string;
  backgroundColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function GiftCardTemplate({
  brandName = "Instacart",
  chipLabel = "Up to {n}% sats back",
  backgroundColor = "#003D29",
  onPress,
  style,
  testID,
}: GiftCardTemplateProps) {
  return (
    <Pressable
      style={[styles.container, { backgroundColor }, style]}
      onPress={onPress}
      testID={testID}
    >
      {/* Brand logo */}
      <View style={styles.brandLogo}>
        <InstacartIcon width={196} height={32} />
      </View>

      {/* Chip — bottom left */}
      {chipLabel ? (
        <View style={styles.chip}>
          <Chip label={chipLabel} type="accent" />
        </View>
      ) : null}

      {/* Fold logo — bottom right */}
      <View style={styles.foldLogo}>
        <FoldLogoIcon width={56} height={16} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 335 / 211,
    borderWidth: 1,
    borderColor: colorMaps.border.secondary,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  brandLogo: {
    position: "absolute",
    top: 24,
    left: 20,
  },
  chip: {
    position: "absolute",
    bottom: 19,
    left: 19,
  },
  foldLogo: {
    position: "absolute",
    bottom: 19,
    right: 19,
  },
});
