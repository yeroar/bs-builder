import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import { CheckCircleIcon } from "../../Icons/CheckCircleIcon";
import { CircleIcon } from "../../Icons/CircleIcon";
import { colorMaps, spacing } from "../../tokens";

export interface SelectionRowProps {
  checked?: boolean;
  children?: React.ReactNode;
  showDivider?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function SelectionRow({
  checked = false,
  children,
  showDivider = true,
  onPress,
  disabled = false,
  style,
  testID,
}: SelectionRowProps) {
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || !onPress}
      style={[styles.container, style]}
      testID={testID}
    >
      {/* Icon */}
      {checked ? (
        <CheckCircleIcon
          width={24}
          height={24}
          color={colorMaps.face.primary}
        />
      ) : (
        <CircleIcon
          width={24}
          height={24}
          color={colorMaps.face.primary}
        />
      )}

      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Divider */}
      {showDivider && <View style={styles.divider} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
    padding: spacing["400"],
    backgroundColor: colorMaps.object.tertiary.default,
    minHeight: 52,
    position: "relative",
  },
  content: {
    flex: 1,
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
  },
});
