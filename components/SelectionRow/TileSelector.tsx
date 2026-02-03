import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { CircleIcon } from "../icons/CircleIcon";
import { colorMaps, spacing, radius } from "../tokens";

export type TileSelectorState = "default" | "pressed" | "active" | "focused";

export interface TileSelectorProps {
  label: string;
  variable: string;
  state?: TileSelectorState;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function TileSelector({
  label,
  variable,
  state = "default",
  onPress,
  disabled = false,
  style,
  testID,
}: TileSelectorProps) {
  const isActive = state === "active";
  const isFocused = state === "focused";
  const isPressed = state === "pressed";

  const getBorderColor = () => {
    if (isActive) return colorMaps.object.primary.bold.default;
    if (isFocused) return colorMaps.border.focused;
    return colorMaps.border.tertiary;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[
        styles.container,
        { borderColor: getBorderColor() },
        isPressed && styles.containerPressed,
        style,
      ]}
      testID={testID}
    >
      {/* Selection Indicator */}
      {isActive || isFocused ? (
        <CheckCircleIcon
          width={24}
          height={24}
          color={colorMaps.face.primary}
        />
      ) : (
        <CircleIcon
          width={24}
          height={24}
          color={colorMaps.face.tertiary}
        />
      )}

      {/* Label */}
      <FoldText type="body-md" style={styles.labelText}>
        {label}
      </FoldText>

      {/* Variable / Value */}
      <FoldText type="body-md" style={styles.variableText}>
        {variable}
      </FoldText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing["400"],
    borderRadius: radius.md,
    borderWidth: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  containerPressed: {
    backgroundColor: colorMaps.object.tertiary.pressed,
  },
  labelText: {
    flex: 1,
    marginLeft: spacing["300"],
    color: colorMaps.face.primary,
  },
  variableText: {
    color: colorMaps.face.secondary,
  },
});
