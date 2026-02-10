import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import Divider from "../../../components/Primitives/Divider/Divider";
import QuickBuyInput from "../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import { colorMaps, spacing } from "../../../components/tokens";

export interface GCDetailProps {
  logo: React.ReactNode;
  title: string;
  offer: React.ReactNode;
  amounts?: number[];
  selectedAmount?: number | null;
  onAmountSelect?: (amount: number) => void;
}

const DEFAULT_AMOUNTS = [10, 20, 250, 500];

export default function GCDetail({
  logo,
  title,
  offer,
  amounts = DEFAULT_AMOUNTS,
  selectedAmount: controlledSelectedAmount,
  onAmountSelect,
}: GCDetailProps) {
  const [internalSelectedAmount, setInternalSelectedAmount] = useState<number | null>(null);

  const selectedAmount = controlledSelectedAmount ?? internalSelectedAmount;

  const handleAmountSelect = (amount: number) => {
    setInternalSelectedAmount(amount);
    onAmountSelect?.(amount);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <PrimaryHeader
        iconSlot={logo}
        header={title}
        hasBodyText={false}
        hasDisclaimer={false}
        noPaddings
        validationChildren={offer}
      />

      <Divider />

      {/* Amount Selector */}
      <QuickBuyInput
        amounts={amounts}
        selectedAmount={selectedAmount}
        onAmountSelect={handleAmountSelect}
        columns={2}
        style={styles.amountSection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["600"],
    paddingTop: spacing["500"],
    paddingHorizontal: spacing["500"],

  },
  amountSection: {
    paddingBottom: spacing["300"],
  },
});
