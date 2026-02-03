import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { colorMaps } from "../tokens";

export type KeypadButtonType = "number" | "icon" | "decimal";

export interface KeypadButtonProps {
  type?: KeypadButtonType;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function KeypadButton({
  type = "number",
  value = "1",
  onPress,
  disabled = false,
  style,
  testID,
}: KeypadButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      testID={testID}
    >
      {type === "icon" ? (
        <DeleteIcon
          width={20}
          height={20}
          color={disabled ? colorMaps.face.disabled : colorMaps.face.primary}
        />
      ) : (
        <FoldText
          type="header-sm"
          style={[
            styles.text,
            disabled && styles.textDisabled,
          ]}
        >
          {type === "decimal" ? "." : value}
        </FoldText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorMaps.layer.background,
  },
  pressed: {
    backgroundColor: colorMaps.layer.backgroundPressed,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colorMaps.face.primary,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
  },
  textDisabled: {
    color: colorMaps.face.disabled,
  },
});
