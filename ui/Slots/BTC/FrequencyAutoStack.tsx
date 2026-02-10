import React from "react";
import { View, StyleSheet } from "react-native";
import TileSelector from "../../../components/Selectors/SelectionRow/TileSelector";
import { colorMaps, spacing } from "../../../components/tokens";

export type Frequency = "Daily" | "Weekly" | "Monthly";

export interface FrequencyAutoStackSlotProps {
  selectedFrequency?: Frequency;
  onFrequencySelect?: (frequency: Frequency) => void;
}

export default function FrequencyAutoStackSlot({
  selectedFrequency = "Daily",
  onFrequencySelect,
}: FrequencyAutoStackSlotProps) {
  return (
    <View style={styles.container}>
      <TileSelector
        label="Daily"
        variable=""
        state={selectedFrequency === "Daily" ? "active" : "default"}
        onPress={() => onFrequencySelect?.("Daily")}
      />
      <TileSelector
        label="Weekly"
        variable=""
        state={selectedFrequency === "Weekly" ? "active" : "default"}
        onPress={() => onFrequencySelect?.("Weekly")}
      />
      <TileSelector
        label="Monthly"
        variable=""
        state={selectedFrequency === "Monthly" ? "active" : "default"}
        onPress={() => onFrequencySelect?.("Monthly")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
    padding: spacing["500"],
    gap: spacing["300"],
  },
});
