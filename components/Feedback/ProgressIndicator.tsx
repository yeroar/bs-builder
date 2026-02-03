import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colorMaps, radius, spacing } from "../tokens";

interface ProgressIndicatorProps {
  variant?: "01" | "02" | "03" | "04";
  style?: StyleProp<ViewStyle>;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  variant = "01",
  style,
}) => {
  const steps = ["01", "02", "03", "04"];

  return (
    <View style={[styles.container, style]}>
      {steps.map((step) => {
        const isActive = step === variant;
        const backgroundColor = isActive
          ? colorMaps.object.secondary.selected // yellow highlight
          : colorMaps.object.secondary.default; // gray background

        return (
          <View
            key={step}
            style={[
              styles.chip,
              {
                backgroundColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: spacing["100"],
    width: "100%",
    alignItems: "center",
    gap: spacing["100"], // 4px
  },
  chip: {
    flex: 1,
    height: "100%",
    borderRadius: radius.rounded,
  },
});

export default ProgressIndicator;
