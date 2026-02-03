import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { colorMaps, spacing, radius } from "../../tokens";

export interface ListItemTransactionProps {
  leadingSlot?: React.ReactNode;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
  showDivider?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function ListItemTransaction({
  leadingSlot,
  leftColumn,
  rightColumn,
  showDivider = false,
  onPress,
  style,
  testID,
}: ListItemTransactionProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.container, style]}
      testID={testID}
    >
      {({ pressed }) => (
        <>
          {/* Pressed overlay */}
          {pressed && <View style={styles.pressedOverlay} />}

          {/* Leading slot */}
          {leadingSlot}

          {/* Content - two columns */}
          <View style={styles.content}>
            {leftColumn}
            {rightColumn}
          </View>

          {/* Divider */}
          {showDivider && <View style={styles.divider} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing["400"],
    gap: spacing["300"],
    backgroundColor: colorMaps.object.tertiary.default,
    position: "relative",
  },
  pressedOverlay: {
    position: "absolute",
    top: 4,
    left: -12,
    right: -12,
    bottom: 4,
    backgroundColor: colorMaps.object.tertiary.pressed,
    borderRadius: radius.lg,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing["300"],
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colorMaps.border.secondary,
  },
});
