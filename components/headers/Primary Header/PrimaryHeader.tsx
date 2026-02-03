import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { spacing, colorMaps } from "../../tokens";

export interface PrimaryHeaderProps {
  header: string;
  body?: string;
  disclaimer?: string;
  hasBodyText?: boolean;
  hasDisclaimer?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  validationChildren?: React.ReactNode;
}

export default function PrimaryHeader({
  header,
  body,
  disclaimer,
  hasBodyText = true,
  hasDisclaimer = true,
  leadingSlot,
  trailingSlot,
  validationChildren,
}: PrimaryHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <FoldText type="header-xl" style={styles.header}>
          {header}
        </FoldText>

        {hasBodyText && body && (
          <FoldText type="body-md" style={styles.body}>
            {body}
          </FoldText>
        )}
      </View>

      {validationChildren}

      {(leadingSlot || trailingSlot) && (
        <View style={styles.footer}>
          {leadingSlot}
          {trailingSlot}
        </View>
      )}

      {hasDisclaimer && disclaimer && (
        <FoldText type="caption" style={styles.disclaimer}>
          {disclaimer}
        </FoldText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    paddingBottom: spacing["600"],
    gap: spacing["400"],
    width: "100%",
  },
  copy: {
    gap: spacing["200"],
  },
  header: {
    color: colorMaps.face.primary,
  },
  body: {
    color: colorMaps.face.secondary,
  },
  disclaimer: {
    color: colorMaps.face.tertiary,
    marginTop: spacing["200"],
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    marginTop: spacing["200"],
  },
});
