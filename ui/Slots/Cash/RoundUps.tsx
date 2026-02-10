import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ButtonSelector from "../../../components/Primitives/Buttons/ButtonSelector/ButtonSelector";
import ProgressVisualization from "../../../components/dataViz/ProgressVisualization";
import { colorMaps, spacing } from "../../../components/tokens";

export type Multiplier = "1x" | "2x" | "5x" | "10x";

export interface RoundUpsSlotProps {
  selectedMultiplier?: Multiplier;
  onMultiplierSelect?: (multiplier: Multiplier) => void;
  currentAmount?: number;
  threshold?: number;
}

const MULTIPLIER_EXAMPLES: Record<Multiplier, { roundUp: string; purchase: string }> = {
  "1x": { purchase: "$1.80", roundUp: "$0.20" },
  "2x": { purchase: "$1.80", roundUp: "$0.40" },
  "5x": { purchase: "$1.80", roundUp: "$1.00" },
  "10x": { purchase: "$1.80", roundUp: "$2.00" },
};

export default function RoundUpsSlot({
  selectedMultiplier = "2x",
  onMultiplierSelect,
  currentAmount = 0,
  threshold = 10,
}: RoundUpsSlotProps) {
  const multipliers: Multiplier[] = ["1x", "2x", "5x", "10x"];
  const example = MULTIPLIER_EXAMPLES[selectedMultiplier];
  const progress = (currentAmount / threshold) * 100;
  const amountToNext = threshold - currentAmount;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PrimaryHeader
          header={`${selectedMultiplier} Round up`}
          body={`A ${example.purchase} purchase rounds up to ${example.roundUp} with a ${selectedMultiplier} multiplier.`}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.selectorRow}>
          {multipliers.map((multiplier) => (
            <ButtonSelector
              key={multiplier}
              label={multiplier}
              isSelected={selectedMultiplier === multiplier}
              onPress={() => onMultiplierSelect?.(multiplier)}
              style={styles.selector}
            />
          ))}
        </View>

        <ProgressVisualization
          progress={progress}
          leftText={`$${amountToNext.toFixed(0)} to next purchase`}
          rightText={`$${threshold}`}
        />

        <FoldText type="body-sm" style={styles.disclaimer}>
          When your Round ups hit ${threshold}, we'll automatically buy bitcoin for you.{" "}
          <FoldText type="body-sm-bold" style={styles.disclaimerBold}>
            Funds remain available until the ${threshold} threshold is reached
          </FoldText>
          .
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  headerContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
    paddingBottom: spacing["1600"],
    gap: spacing["400"],
  },
  selectorRow: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  selector: {
    flex: 1,
  },
  disclaimer: {
    color: colorMaps.face.tertiary,
  },
  disclaimerBold: {
    color: colorMaps.face.primary,
  },
});
