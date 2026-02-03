import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../FoldText";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { XCircleIcon } from "../../icons/XCircleIcon";
import { colorMaps, spacing } from "../../tokens";

export type ValidationType = "success" | "danger";

export interface ValidationProps {
  label: string;
  type?: ValidationType;
  style?: ViewStyle;
}

export default function Validation({
  label = "Validation",
  type = "success",
  style,
}: ValidationProps) {
  const isDanger = type === "danger";
  const isSuccess = type === "success";

  return (
    <View style={[styles.container, style]}>
      {isSuccess && (
        <CheckCircleIcon
          width={16}
          height={16}
          color={colorMaps.face.primary}
        />
      )}
      <FoldText type="body-sm" style={styles.label}>
        {label}
      </FoldText>
      {isDanger && (
        <XCircleIcon
          width={16}
          height={16}
          color={colorMaps.face.negativeBold}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
    width: "100%",
  },
  label: {
    flex: 1,
    color: colorMaps.face.secondary,
  },
});
