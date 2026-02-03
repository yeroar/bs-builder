import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface MarcomProductTileProps {
  label: string;
  message: string;
  button?: React.ReactNode;
  hasButton?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function MarcomProductTile({
  label,
  message,
  button,
  hasButton = true,
  style,
  testID,
}: MarcomProductTileProps) {
  return (
    <View
      style={[styles.container, style]}
      testID={testID}
    >
      <View style={styles.copy}>
        <FoldText type="body-sm-bold" style={styles.label}>
          {label}
        </FoldText>
        <FoldText type="body-sm" style={styles.message}>
          {message}
        </FoldText>
      </View>
      {hasButton && button && (
        <View style={styles.buttonContainer}>
          {button}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderColor: colorMaps.border.tertiary,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["600"],
    gap: spacing["500"],
    width: "100%",
    alignItems: "flex-start",
  },
  copy: {
    gap: 0,
    width: "100%",
  },
  label: {
    color: colorMaps.face.tertiary,
    lineHeight: 16,
  },
  message: {
    color: colorMaps.face.primary,
    lineHeight: 16,
  },
  buttonContainer: {
    alignItems: "flex-start",
  },
});
