import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import Toggle from "../Selectors/Toggle/Toggle";
import PillSelector from "../Selectors/PillSelector/PillSelector";
import TextContainer from "../Inputs/TextContainer/TextContainer";
import { colorMaps, spacing } from "../tokens";

export type PropControlType = "toggle" | "select" | "text";

export interface PropControlOption {
  label: string;
  value: string;
}

export interface PropControlProps {
  type: PropControlType;
  label: string;
  value: any;
  onChange: (value: any) => void;
  options?: PropControlOption[];
  style?: ViewStyle;
}

export default function PropControl({
  type,
  label,
  value,
  onChange,
  options = [],
  style,
}: PropControlProps) {
  const renderControl = () => {
    switch (type) {
      case "toggle":
        return (
          <Toggle
            value={Boolean(value)}
            onValueChange={onChange}
          />
        );
      case "select":
        return (
          <View style={styles.selectContainer}>
            {options.map((option) => (
              <PillSelector
                key={option.value}
                label={option.label}
                isActive={value === option.value}
                onPress={() => onChange(option.value)}
                size="sm"
              />
            ))}
          </View>
        );
      case "text":
        return (
          <View style={styles.textInputContainer}>
            <TextContainer
              value={String(value || "")}
              onChangeText={onChange}
              placeholder={label}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <FoldText type="body-sm" style={styles.label}>
        {label}
      </FoldText>
      {renderControl()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing["200"],
    gap: spacing["300"],
  },
  label: {
    color: colorMaps.face.secondary,
    minWidth: 80,
  },
  selectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing["100"],
    flex: 1,
    justifyContent: "flex-end",
  },
  textInputContainer: {
    flex: 1,
    maxWidth: 200,
  },
});
