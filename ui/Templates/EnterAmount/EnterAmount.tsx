import React from "react";
import { View, StyleSheet } from "react-native";
import { colorMaps } from "../../../components/tokens";

export interface EnterAmountProps {
  children: React.ReactNode;
}

export default function EnterAmount({
  children,
}: EnterAmountProps) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
    justifyContent: "space-between",
  },
});
