import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../../Primitives/FoldText";
import { spacing, colorMaps } from "../../../tokens";


export interface TransactionHeaderProps {
  title: string;
  subheader?: string;
  hasSubheader?: boolean;
  footnote?: string;
  hasFootnote?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  style?: ViewStyle;
}

export default function TransactionHeader({
  title,
  subheader,
  hasSubheader = true,
  footnote,
  hasFootnote = true,
  leadingSlot,
  trailingSlot,
  style,
}: TransactionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.copy}>
        <FoldText type="header-md" style={styles.title}>
          {title}
        </FoldText>

        {hasSubheader && subheader && (
          <FoldText type="header-md" style={styles.subheader}>
            {subheader}
          </FoldText>
        )}

        {hasFootnote && footnote && (
          <FoldText type="body-md" style={styles.footnote}>
            {footnote}
          </FoldText>
        )}
      </View>

      {(leadingSlot || trailingSlot) && (
        <View style={styles.footer}>
          {leadingSlot}
          {trailingSlot}
        </View>
      )}
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
    gap: spacing["200"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  subheader: {
    color: colorMaps.face.primary,
  },
  footnote: {
    color: colorMaps.face.secondary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
});
