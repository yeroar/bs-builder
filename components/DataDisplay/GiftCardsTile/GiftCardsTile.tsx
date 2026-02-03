import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface GiftCardsTileProps {
  /** Icon/brand slot (iconContainerBrand) */
  children?: React.ReactNode;
  /** Brand/merchant name */
  title?: string;
  /** Sats back text */
  secondaryText?: string;
  style?: ViewStyle;
  testID?: string;
}

export default function GiftCardsTile({
  children,
  title = "gcBrand",
  secondaryText = "Up to {n}% sats back",
  style,
  testID,
}: GiftCardsTileProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {children}
      <View style={styles.content}>
        <FoldText type="body-md-bold" style={styles.title} numberOfLines={1}>
          {title}
        </FoldText>
        <FoldText type="body-sm-bold" style={styles.secondaryText} numberOfLines={1}>
          {secondaryText}
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderWidth: 0.5,
    borderColor: colorMaps.border.tertiary,
    borderRadius: radius.lg,
    paddingTop: spacing["400"],
    paddingBottom: spacing["400"],
    paddingHorizontal: spacing["400"],
    gap: spacing["1200"],
    flex: 1,
    // Shadow
    shadowColor: "#6A5F55",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    gap: spacing["50"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  secondaryText: {
    color: colorMaps.face.accentBold,
  },
});
