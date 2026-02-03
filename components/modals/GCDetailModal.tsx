import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MiniModal from "./MiniModal";
import ModalFooter from "./ModalFooter";
import Button from "../Buttons/Button/Button";
import GCDetailSlot from "../Slots/GiftCard/GCDetailSlot";
import { spacing } from "../tokens";

export interface GCDetailModalProps {
  visible?: boolean;
  brand: string;
  title: string;
  satsBack?: string;
  availability?: string;
  amounts?: number[];
  onClose?: () => void;
  onContinue?: (amount: number) => void;
  onFavorite?: () => void;
}

export default function GCDetailModal({
  visible = true,
  brand,
  title,
  satsBack,
  availability,
  amounts,
  onClose,
  onContinue,
  onFavorite,
}: GCDetailModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedAmount) {
      onContinue?.(selectedAmount);
    }
  };

  if (!visible) return null;

  return (
    <MiniModal
      showHeader={false}
      onClose={onClose}
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button
              label="Continue"
              hierarchy="primary"
              size="lg"
              disabled={!selectedAmount}
              onPress={handleContinue}
            />
          }
          secondaryButton={
            <Button
              label={`Favorite ${title.replace(' gift card', '')}`}
              hierarchy="tertiary"
              size="lg"
              onPress={onFavorite}
            />
          }
        />
      }
    >
      <View style={styles.content}>
        <GCDetailSlot
          brand={brand}
          title={title}
          satsBack={satsBack}
          availability={availability}
          amounts={amounts}
          selectedAmount={selectedAmount}
          onAmountSelect={setSelectedAmount}
        />
      </View>
    </MiniModal>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: -spacing["500"],
    marginTop: -spacing["500"],
  },
});
