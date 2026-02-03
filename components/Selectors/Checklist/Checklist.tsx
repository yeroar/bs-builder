import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { CheckCircleIcon } from "../../Icons/CheckCircleIcon";
import { CircleIcon } from "../../Icons/CircleIcon";
import { colorMaps, spacing, radius } from "../../tokens";

export interface ChecklistProps {
  label: string;
  isSelected?: boolean;
  hasDiv?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function Checklist({
  label,
  isSelected = false,
  hasDiv = true,
  onPress,
  disabled = false,
  style,
  testID,
}: ChecklistProps) {
  const iconSize = 20;

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled || !onPress}
        testID={testID}
      >
        {({ pressed }) => (
          <View style={styles.container}>
            {/* Pressed background overlay - only while pressing */}
            {pressed && <View style={styles.pressedBackground} />}

            <View style={styles.row}>
              <View style={styles.labelContainer}>
                {/* Icon - 20px, disabled color for default, primary for selected */}
                {isSelected ? (
                  <CheckCircleIcon
                    width={iconSize}
                    height={iconSize}
                    color={colorMaps.face.primary}
                  />
                ) : (
                  <CircleIcon
                    width={iconSize}
                    height={iconSize}
                    color={colorMaps.face.disabled}
                  />
                )}

                {/* Label text */}
                <FoldText type="body-md-bold" style={styles.label}>
                  {label}
                </FoldText>
              </View>
            </View>
          </View>
        )}
      </Pressable>

      {/* Divider */}
      {hasDiv && <View style={styles.divider} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorMaps.layer.background,
    width: "100%",
  },
  container: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  pressedBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: -8,
    right: -8,
    backgroundColor: colorMaps.object.tertiary.pressed,
    borderRadius: radius.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["500"],
    width: "100%",
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
    paddingRight: spacing["400"],
  },
  label: {
    flex: 1,
    color: colorMaps.face.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
    width: "100%",
  },
});
