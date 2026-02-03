import React from "react";
import { View, StyleSheet } from "react-native";
import { colorMaps, spacing } from "../../tokens";

export interface TxConfirmationProps {
  children: React.ReactNode;
}

export default function TxConfirmation({
  children,
}: TxConfirmationProps) {
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
  },
});
