import React from "react";
import { View, StyleSheet } from "react-native";
import Checklist from "../../Checklist/Checklist";
import { colorMaps, spacing } from "../../tokens";

export type RedemptionMethod = "in-store" | "online" | "both";

export interface GCRedemptionMethodSlotProps {
  selectedMethod?: RedemptionMethod | null;
  onMethodSelect?: (method: RedemptionMethod) => void;
}

const REDEMPTION_OPTIONS: { value: RedemptionMethod; label: string }[] = [
  { value: "in-store", label: "In-store" },
  { value: "online", label: "Online" },
  { value: "both", label: "In-store and online" },
];

export default function GCRedemptionMethodSlot({
  selectedMethod,
  onMethodSelect,
}: GCRedemptionMethodSlotProps) {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {REDEMPTION_OPTIONS.map((option) => (
          <Checklist
            key={option.value}
            label={option.label}
            isSelected={selectedMethod === option.value}
            hasDiv={false}
            onPress={() => onMethodSelect?.(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  list: {
    gap: 0,
  },
});
