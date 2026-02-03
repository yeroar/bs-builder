import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import FoldPressable from "../../Primitives/FoldPressable";
import { colorMaps, spacing } from "../../tokens";
import { ChevronDownIcon } from "../../Icons/ChevronDownIcon";

export type DropDownVariant = "default" | "active";

export interface DropDownProps {
  label: string;
  variant?: DropDownVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function DropDown({
  label,
  variant = "default",
  onPress,
  style,
}: DropDownProps) {
  const isActive = variant === "active";

  const getColors = (pressed: boolean) => {
    if (isActive) {
      return {
        bg: colorMaps.object.secondary.selected,
        text: colorMaps.face.primary,
        icon: colorMaps.face.primary,
      };
    }
    return {
      bg: pressed
        ? colorMaps.object.secondary.pressed
        : colorMaps.object.secondary.default,
      text: colorMaps.face.secondary,
      icon: colorMaps.face.tertiary,
    };
  };

  return (
    <FoldPressable onPress={onPress} style={style}>
      {({ pressed }) => {
        const colors = getColors(pressed);
        return (
          <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <FoldText
              type={isActive ? "body-md-bold" : "body-md"}
              style={{ color: colors.text }}
            >
              {label}
            </FoldText>
            <ChevronDownIcon
              width={16}
              height={16}
              color={colors.icon}
            />
          </View>
        );
      }}
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: spacing["400"],
    paddingRight: spacing["300"],
    paddingVertical: spacing["200"],
    borderRadius: 100,
    gap: spacing["50"],
  },
});
