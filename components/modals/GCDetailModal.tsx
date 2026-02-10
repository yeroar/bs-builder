import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MiniModal from "./MiniModal";
import ModalFooter from "./ModalFooter";
import Button from "../Primitives/Buttons/Button/Button";
import GCDetail from "../../ui/Slots/GiftCard/GCDetail";
import { spacing } from "../tokens";

export interface GCDetailModalProps {
  visible?: boolean;
  logo: React.ReactNode;
  title: string;
  offer: React.ReactNode;
  amounts?: number[];
  onClose?: () => void;
  onContinue?: (amount: number) => void;
  onFavorite?: () => void;
}

export default function GCDetailModal({
  visible = true,
  logo,
  title,
  offer,
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
        <GCDetail
          logo={logo}
          title={title}
          offer={offer}
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
