import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { spacing, colorMaps } from "../../../tokens";

export interface SecondaryHeaderProps {
  title: string;
  body?: string;
  disclaimer?: string;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  style?: ViewStyle;
}

export default function SecondaryHeader({
  title,
  body,
  disclaimer,
  leadingSlot,
  trailingSlot,
  style,
}: SecondaryHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.copy}>
        <FoldText type="header-md" style={styles.header}>
          {title}
        </FoldText>

        {body ? (
          <FoldText type="body-md" style={styles.body}>
            {body}
          </FoldText>
        ) : null}
      </View>

      {(leadingSlot || trailingSlot) && (
        <View style={styles.footer}>
          {leadingSlot}
          {trailingSlot}
        </View>
      )}

      {disclaimer ? (
        <FoldText type="body-sm" style={styles.disclaimer}>
          {disclaimer}
        </FoldText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["600"],
    gap: spacing["400"],
    width: "100%",
  },
  copy: {
    gap: spacing["100"],
  },
  header: {
    color: colorMaps.face.primary,
  },
  body: {
    color: colorMaps.face.secondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  disclaimer: {
    color: colorMaps.face.tertiary,
  },
});
