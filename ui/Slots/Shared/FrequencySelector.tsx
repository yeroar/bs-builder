import React from "react";
import { View, StyleSheet } from "react-native";
import TileSelector from "../../../components/Selectors/SelectionRow/TileSelector";
import { colorMaps, spacing } from "../../../components/tokens";

export interface FrequencyOption {
  label: string;
  value: string;
}

export interface FrequencySelectorProps {
  options?: FrequencyOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

const defaultOptions: FrequencyOption[] = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
];

export default function FrequencySelector({
  options = defaultOptions,
  selectedValue = "Daily",
  onSelect,
}: FrequencySelectorProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TileSelector
          key={option.value}
          label={option.label}
          variable=""
          state={selectedValue === option.value ? "active" : "default"}
          onPress={() => onSelect?.(option.value)}
        />
      ))}
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
