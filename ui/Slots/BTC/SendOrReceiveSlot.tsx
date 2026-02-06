import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../components/tokens";

export interface SendOrReceiveSlotProps {
  title?: string;
  subtitle?: string;
}

export default function SendOrReceiveSlot({
  title = "Send or receive",
  subtitle = "Transact with any bitcoin wallet",
}: SendOrReceiveSlotProps) {
  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.title}>
        {title}
      </FoldText>
      <FoldText type="body-lg" style={styles.subtitle}>
        {subtitle}
      </FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["300"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  subtitle: {
    color: colorMaps.face.secondary,
  },
});
