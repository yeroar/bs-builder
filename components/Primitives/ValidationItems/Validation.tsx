import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../FoldText";
import { CheckCircleIcon } from "../../Icons/CheckCircleIcon";
import { XCircleIcon } from "../../Icons/XCircleIcon";
import { colorMaps, spacing } from "../../tokens";

export type ValidationType = "success" | "danger";

export interface ValidationProps {
  label: string;
  type?: ValidationType;
  leadingIcon?: ReactNode;
  labelColor?: string;
  style?: ViewStyle;
}

export default function Validation({
  label = "Validation",
  type = "success",
  leadingIcon,
  labelColor,
  style,
}: ValidationProps) {
  const isDanger = type === "danger";
  const isSuccess = type === "success";

  // Get icon color based on type
  const getIconColor = () => {
    if (isDanger) return colorMaps.face.negativeBold;
    return colorMaps.face.primary;
  };

  // Check if leadingIcon has content (not undefined, null, or empty array)
  const hasLeadingIcon = leadingIcon &&
    !(Array.isArray(leadingIcon) && leadingIcon.length === 0);

  // Use custom leadingIcon if provided, otherwise use default based on type
  const renderLeadingIcon = () => {
    if (hasLeadingIcon) {
      // Clone the icon with correct size and color
      if (React.isValidElement(leadingIcon)) {
        return React.cloneElement(leadingIcon as React.ReactElement<any>, {
          width: 16,
          height: 16,
          color: getIconColor(),
        });
      }
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
      <FoldText type="body-md-bold" style={[styles.label, labelColor && { color: labelColor }]}>
        {label}
      </FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["150"],
    width: "100%",
  },
  label: {
    flex: 1,
    color: colorMaps.face.secondary,
  },
});
