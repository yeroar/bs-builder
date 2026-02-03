import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import ButtonSelector from "../../Primitives/Buttons/ButtonSelector/ButtonSelector";
import PillSelector from "../../Selectors/PillSelector/PillSelector";
import { colorMaps, spacing } from "../../tokens";

export default function SelectionCategory() {
  // ButtonSelector state
  const [selectedButton, setSelectedButton] = useState(0);

  // PillSelector state
  const [pillSelectorActive, setPillSelectorActive] = useState(false);
  const [pillSelectorVariant, setPillSelectorVariant] = useState<"onLight" | "onBrand">("onLight");
  const [pillSelectorSize, setPillSelectorSize] = useState<"md" | "sm">("md");

  return (
    <View style={styles.container}>
      {/* ButtonSelector */}
      <ComponentCard
        title="ButtonSelector"
        description="Segmented control for mutually exclusive options"
      >
        <View style={styles.buttonSelectorGroup}>
          {["Option 1", "Option 2", "Option 3"].map((label, index) => (
            <ButtonSelector
              key={label}
              label={label}
              isSelected={selectedButton === index}
              onPress={() => setSelectedButton(index)}
            />
          ))}
        </View>
      </ComponentCard>

      {/* PillSelector */}
      <ComponentCard
        title="PillSelector"
        description="Pill-shaped selection chips for filtering"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Active"
              value={pillSelectorActive}
              onChange={setPillSelectorActive}
            />
            <PropControl
              type="select"
              label="Variant"
              value={pillSelectorVariant}
              onChange={setPillSelectorVariant}
              options={[
                { label: "onLight", value: "onLight" },
                { label: "onBrand", value: "onBrand" },
              ]}
            />
            <PropControl
              type="select"
              label="Size"
              value={pillSelectorSize}
              onChange={setPillSelectorSize}
              options={[
                { label: "md", value: "md" },
                { label: "sm", value: "sm" },
              ]}
            />
          </View>
        }
      >
        <View style={[
          styles.pillPreview,
          pillSelectorVariant === "onBrand" && styles.pillPreviewBrand
        ]}>
          <PillSelector
            label="Category"
            isActive={pillSelectorActive}
            variant={pillSelectorVariant}
            size={pillSelectorSize}
            onPress={() => setPillSelectorActive(!pillSelectorActive)}
          />
        </View>
      </ComponentCard>

      {/* PillSelector Group Example */}
      <ComponentCard
        title="PillSelector Group"
        description="Multiple pills for category selection"
      >
        <View style={styles.pillGroup}>
          {["All", "Bitcoin", "Cash", "Credit"].map((label, index) => (
            <PillSelector
              key={label}
              label={label}
              isActive={index === 0}
              onPress={() => { }}
              size="sm"
            />
          ))}
        </View>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  controlsColumn: {
    gap: spacing["100"],
  },
  buttonSelectorGroup: {
    flexDirection: "row",
    gap: spacing["200"],
    flexWrap: "wrap",
  },
  pillPreview: {
    padding: spacing["400"],
    borderRadius: 8,
  },
  pillPreviewBrand: {
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  pillGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing["200"],
  },
});
