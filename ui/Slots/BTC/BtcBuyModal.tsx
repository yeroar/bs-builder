import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import QuickBuyInput from "../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import { colorMaps, spacing } from "../../../components/tokens";

export type BuyAmount = "$10" | "$20" | "$50" | "$100" | "$200" | "custom" | null;

export interface BtcBuyModalProps {
  selectedAmount: BuyAmount;
  onSelectAmount: (amount: BuyAmount) => void;
}

const items = [
  { label: "$10", value: "$10" as BuyAmount },
  { label: "$20", value: "$20" as BuyAmount },
  { label: "$50", value: "$50" as BuyAmount },
  { label: "$100", value: "$100" as BuyAmount },
  { label: "$200", value: "$200" as BuyAmount },
  { label: "...", value: "custom" as BuyAmount },
];

export default function BtcBuyModal({
  selectedAmount,
  onSelectAmount,
}: BtcBuyModalProps) {
  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.title}>
        Buy bitcoin
      </FoldText>

      <QuickBuyInput
        items={items}
        selectedValue={selectedAmount}
        onSelect={onSelectAmount}
        columns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["800"],
    paddingBottom: spacing["300"],
  },
  title: {
    color: colorMaps.face.primary,
  },
});
