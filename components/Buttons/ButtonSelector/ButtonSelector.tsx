import React from "react";
import {
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface ButtonSelectorProps {
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function ButtonSelector({
  label,
  isSelected = false,
  onPress,
  disabled = false,
  style,
  testID,
}: ButtonSelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.containerSelected,
        pressed && styles.containerPressed,
        style,
      ]}
      testID={testID}
    >
      <FoldText type="body-lg-bold" style={styles.label}>
        {label}
      </FoldText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: spacing["1400"],
    paddingHorizontal: spacing["400"],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorMaps.layer.background,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
  },
  containerSelected: {
    borderWidth: 1.5,
    borderColor: colorMaps.border.primary,
  },
  containerPressed: {
    backgroundColor: colorMaps.layer.backgroundPressed,
  },
  label: {
    color: colorMaps.face.primary,
  },
});
