import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { XCircleIcon } from "../icons/XCircleIcon";
import { colorMaps, spacing } from "../tokens";

export type ValidationType = "success" | "danger";

export interface ValidationProps {
  label: string;
  type?: ValidationType;
  leadingIcon?: ReactNode;
  style?: ViewStyle;
}

export default function Validation({
  label = "Validation",
  type = "success",
  leadingIcon,
  style,
}: ValidationProps) {
  const isDanger = type === "danger";
  const isSuccess = type === "success";

  // Use custom leadingIcon if provided, otherwise use default based on type
  const renderLeadingIcon = () => {
    if (leadingIcon) {
      return leadingIcon;
    }
    if (isSuccess) {
      return (
        <CheckCircleIcon
          width={16}
          height={16}
          color={colorMaps.face.primary}
        />
      );
    }
    if (isDanger) {
      return (
        <XCircleIcon
          width={16}
          height={16}
          color={colorMaps.face.negativeBold}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, style]}>
      {renderLeadingIcon()}
      <FoldText type="body-sm" style={styles.label}>
        {label}
      </FoldText>
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
    color: colorMaps.face.secondary,
  },
});
