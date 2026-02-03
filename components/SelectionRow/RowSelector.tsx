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
import Chip from "../Chip/Chip";
import { colorMaps, spacing, radius } from "../tokens";

export type RowSelectorState = "default" | "pressed" | "active";

export interface RowSelectorProps {
  label: string;
  description?: string;
  state?: RowSelectorState;
  hasChip?: boolean;
  chipLabel?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function RowSelector({
  label,
  description,
  state = "default",
  hasChip = false,
  chipLabel = "Recommended",
  onPress,
  disabled = false,
  style,
  testID,
}: RowSelectorProps) {
  const isActive = state === "active";
  const isPressed = state === "pressed";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[
        styles.container,
        isActive && styles.containerActive,
        isPressed && styles.containerPressed,
        style,
      ]}
      testID={testID}
    >
      {/* Selection Indicator */}
      <View style={styles.indicatorContainer}>
        {isActive ? (
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
      </View>

      {/* Content */}
      <View style={styles.content}>
        <FoldText type="body-md-bold" style={styles.labelText}>
          {label}
        </FoldText>
        {description && (
          <FoldText type="body-md" style={styles.descriptionText}>
            {description}
          </FoldText>
        )}
        {hasChip && (
          <Chip label={chipLabel} type="primary" bold={true} style={styles.chip} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["500"],
    backgroundColor: colorMaps.object.tertiary.default,
    width: "100%",
    minHeight: 82,
  },
  containerActive: {
    backgroundColor: colorMaps.object.tertiary.default, // Figma shows it as same bg but with active indicator
  },
  containerPressed: {
    backgroundColor: colorMaps.object.tertiary.pressed,
  },
  indicatorContainer: {
    paddingTop: spacing["50"], // Align with first line of text
  },
  content: {
    flex: 1,
    marginLeft: spacing["300"],
    gap: spacing["50"],
  },
  labelText: {
    color: colorMaps.face.primary,
  },
  descriptionText: {
    color: colorMaps.face.secondary,
  },
  chip: {
    marginTop: spacing["100"],
  },
});
