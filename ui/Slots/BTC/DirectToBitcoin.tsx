import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import ButtonSelector from "../../../components/Primitives/Buttons/ButtonSelector/ButtonSelector";
import Ring from "../../../components/Selectors/Ring/Ring";
import { colorMaps, spacing } from "../../../components/tokens";

export interface DirectToBitcoinSlotProps {
  selectedPercentage?: number;
  onPercentageSelect?: (percentage: number) => void;
  onCustomPress?: () => void;
}

const ROW_1_PERCENTAGES = [1, 5, 10];
const ROW_2_PERCENTAGES = [15, 20];

export default function DirectToBitcoinSlot({
  selectedPercentage = 0,
  onPercentageSelect,
  onCustomPress,
}: DirectToBitcoinSlotProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.ringContainer}>
          <Ring percentage={selectedPercentage} size={280} onChange={onPercentageSelect} />
        </View>

        <View style={styles.selectorContainer}>
          <View style={styles.selectorRow}>
            {ROW_1_PERCENTAGES.map((percentage) => (
              <ButtonSelector
                key={percentage}
                label={`${percentage}%`}
                isSelected={selectedPercentage === percentage}
                onPress={() => onPercentageSelect?.(percentage)}
                style={styles.selector}
              />
            ))}
          </View>
          <View style={styles.selectorRow}>
            {ROW_2_PERCENTAGES.map((percentage) => (
              <ButtonSelector
                key={percentage}
                label={`${percentage}%`}
                isSelected={selectedPercentage === percentage}
                onPress={() => onPercentageSelect?.(percentage)}
                style={styles.selector}
              />
            ))}
            <ButtonSelector
              label="..."
              isSelected={false}
              onPress={onCustomPress}
              style={styles.selector}
            />
          </View>
        </View>

        <FoldText type="body-sm" style={styles.disclaimer}>
          The selected percentage will be automatically converted to bitcoin when your direct deposit arrives.{" "}
          <FoldText type="body-sm-bold" style={styles.disclaimerBold}>
            You can change this at any time
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
    overflow: "visible",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    paddingBottom: spacing["1600"],
    gap: spacing["500"],
    overflow: "visible",
  },
  ringContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    overflow: "visible",
  },
  selectorContainer: {
    gap: spacing["200"],
  },
  selectorRow: {
    flexDirection: "row",
    gap: spacing["200"],
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
