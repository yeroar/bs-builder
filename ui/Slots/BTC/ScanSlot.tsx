import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../../components/tokens";

export interface ScanSlotProps {
  message?: string;
  cameraSlot?: React.ReactNode;
}

export default function ScanSlot({
  message = "Scan any bitcoin QR code",
  cameraSlot,
}: ScanSlotProps) {
  return (
    <View style={styles.container}>
      <View style={styles.scanner}>
        {cameraSlot || <View style={styles.placeholder} />}
      </View>

      <FoldText type="body-md-bold" style={styles.message}>
        {message}
      </FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["600"],
  },
  scanner: {
    flex: 1,
    width: "100%",
    borderRadius: radius.md,
    overflow: "hidden",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: radius.md,
  },
  message: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
});
