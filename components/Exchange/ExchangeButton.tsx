import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { SkeuomorphicButtonBorder } from "../icons/SkeuomorphicButtonBorder";
import { colorPrimitives } from "../tokens/colorPrimitives";
import { colorMaps, spacing, radius } from "../tokens";

export interface ExchangeButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function ExchangeButton({
  label,
  onPress,
  disabled = false,
  style,
  testID,
}: ExchangeButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        disabled && styles.containerDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <View style={StyleSheet.absoluteFill}>
        <SkeuomorphicButtonBorder width="100%" height="100%" />
      </View>
      <FoldText type="button-lg" style={styles.label}>
        {label}
      </FoldText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPrimitives.gray["1000"],
    height: 48,
    paddingHorizontal: spacing["800"],
    borderRadius: radius.rounded,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
  containerPressed: {
    opacity: 0.8,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  label: {
    color: colorMaps.face.inversePrimary,
    textShadowColor: "rgba(23, 21, 14, 0.8)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0,
  },
});
