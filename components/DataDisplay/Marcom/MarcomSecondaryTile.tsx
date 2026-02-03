import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../../tokens";

export interface MarcomSecondaryTileProps {
  header: string;
  bodyText?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export default function MarcomSecondaryTile({
  header,
  bodyText,
  onPress,
  disabled = false,
  style,
  testID,
}: MarcomSecondaryTileProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
        style,
      ]}
      testID={testID}
    >
      {/* Copy */}
      <View style={styles.copy}>
        <FoldText type="body-md-bold" style={styles.header}>
          {header}
        </FoldText>
        {bodyText && (
          <FoldText type="body-md" style={styles.body}>
            {bodyText}
          </FoldText>
        )}
      </View>

      {/* Chevron */}
      <ChevronRightIcon
        width={30}
        height={30}
        color={colorMaps.face.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["400"],
    padding: spacing["400"],
    backgroundColor: colorMaps.object.primary.bold.default,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  containerPressed: {
    backgroundColor: colorMaps.object.primary.bold.pressed,
  },
  copy: {
    flex: 1,
  },
  header: {
    color: colorMaps.face.primary,
  },
  body: {
    color: colorMaps.face.secondary,
  },
});
