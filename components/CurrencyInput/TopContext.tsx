import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { CalendarIcon } from "../icons/CalendarIcon";
import { colorMaps, spacing } from "../tokens";

export type TopContextVariant = "btc" | "frequency" | "giftcard" | "empty";

export interface TopContextProps {
  variant?: TopContextVariant;
  value?: string;
  leadingIcon?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export default function TopContext({
  variant = "btc",
  value = "~฿0",
  leadingIcon,
  style,
  testID,
}: TopContextProps) {
  if (variant === "empty") {
    return <View style={[styles.container, style]} testID={testID} />;
  }

  // Determine the icon to display
  const getIcon = () => {
    if (leadingIcon) return leadingIcon;
    if (variant === "frequency") return <CalendarIcon width={16} height={16} color={colorMaps.face.primary} />;
    return null;
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {getIcon()}
      <FoldText type="body-md-bold" style={styles.text}>
        {value}
      </FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["100"],
  },
  text: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
});
