import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colorMaps, spacing } from "../../../tokens";

export interface ReceiptDetailsProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function ReceiptDetails({
  children,
  style,
}: ReceiptDetailsProps) {
  return (
    <View>
      {children}
    </View>
  );
}

