import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import FoldPressable from "../../Primitives/FoldPressable";
import IconContainer from "../../Primitives/IconContainer/IconContainer";
import Chip from "../../Primitives/Chip/Chip";
import { colorMaps, spacing, radius } from "../../tokens";

export interface SearchPillProps {
  label?: string;
  brand?: string;
  chipLabel?: string;
  hasAvatar?: boolean;
  hasChip?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function SearchPill({
  label = "Chewy",
  brand = "Chewy",
  chipLabel = "Up to n%",
  hasAvatar = true,
  hasChip = false,
  onPress,
  style,
}: SearchPillProps) {
  return (
    <FoldPressable onPress={onPress} style={style}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed
                ? colorMaps.object.tertiary.pressed
                : colorMaps.object.tertiary.default,
            },
          ]}
        >
          {hasAvatar && <IconContainer brand={brand} size="xs" />}
          <FoldText type="body-md" style={styles.label}>
            {label}
          </FoldText>
          {hasChip && <Chip label={chipLabel} type="accent" style={{ alignSelf: "center" }} />}
        </View>
      )}
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
    paddingLeft: spacing["300"],
    paddingRight: spacing["500"],
    paddingVertical: spacing["200"],
    borderRadius: radius.rounded,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
  },
  label: {
    color: colorMaps.face.primary,
  },
});
