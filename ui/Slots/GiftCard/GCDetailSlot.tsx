import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/Headers/PrimaryHeader";
import IconContainer from "../../../components/IconContainer/IconContainer";
import ValidationGroup from "../../../components/Primitives/ValidationItems/ValidationGroup";
import Validation from "../../../components/Primitives/ValidationItems/Validation";
import { RocketIcon } from "../../../components/icons/RocketIcon";
import { GlobeIcon } from "../../../components/icons/GlobeIcon";
import Divider from "../../../components/Divider/Divider";
import QuickBuyInput from "../../../components/Input/QuickBuyInput/QuickBuyInput";
import { colorMaps, spacing } from "../../../components/tokens";

export interface GCDetailSlotProps {
  brand: string;
  title: string;
  satsBack?: string;
  availability?: string;
  amounts?: number[];
  selectedAmount?: number | null;
  onAmountSelect?: (amount: number) => void;
}

const DEFAULT_AMOUNTS = [10, 20, 250, 500];

export default function GCDetailSlot({
  brand,
  title,
  satsBack = "Up to 5% sats back",
  availability = "Online and in-store",
  amounts = DEFAULT_AMOUNTS,
  selectedAmount: controlledSelectedAmount,
  onAmountSelect,
}: GCDetailSlotProps) {
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
        iconSlot={<IconContainer brand={brand} size="lg" />}
        header={title}
        hasBodyText={false}
        hasDisclaimer={false}
        validationChildren={
          <ValidationGroup>
            <Validation
              label={satsBack}
              type="success"
              leadingIcon={<RocketIcon width={16} height={16} color={colorMaps.face.accentBold} />}
              labelColor={colorMaps.face.accentBold}
            />
            <Validation
              label={availability}
              type="success"
              leadingIcon={<GlobeIcon width={16} height={16} color={colorMaps.face.primary} />}
            />
          </ValidationGroup>
        }
      />

      <Divider inset />

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
    gap: spacing["500"],
  },
  amountSection: {
    paddingHorizontal: spacing["500"],
    paddingBottom: spacing["300"],
  },
});
