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

export interface PlanSelectorProps {
  plan: string;
  description: string;
  isSelected?: boolean;
  chip?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function PlanSelector({
  plan,
  description,
  isSelected = false,
  chip,
  onPress,
  disabled = false,
  style,
  testID,
}: PlanSelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        style,
      ]}
      testID={testID}
    >
      {/* Selection Indicator */}
      {isSelected ? (
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

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <FoldText type="header-xs" style={styles.planText}>
            {plan}
          </FoldText>
          {chip}
        </View>
        <FoldText type="body-md" style={styles.descriptionText}>
          {description}
        </FoldText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["500"],
    backgroundColor: colorMaps.object.tertiary.default,
    borderRadius: radius.lg,
    width: "100%",
  },
  containerSelected: {
    backgroundColor: colorMaps.object.tertiary.pressed,
  },
  content: {
    flex: 1,
    gap: spacing["50"],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
  },
  planText: {
    color: colorMaps.face.primary,
  },
  descriptionText: {
    color: colorMaps.face.secondary,
  },
});
