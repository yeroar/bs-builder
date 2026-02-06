import React, { useState } from "react";
import { Modal } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import GCDetailModal from "../../../../components/Modals/GCDetailModal";
import GiftCardConfirmation from "../../../Slots/GiftCard/GiftCardConfirmation";
import GiftCardSuccess from "../../../Slots/GiftCard/GiftCardSuccess";
import FoldPressable from "../../../../components/Primitives/FoldPressable";
import { StarIcon } from "../../../../components/Icons/StarIcon";
import { colorMaps } from "../../../../components/tokens";

type FlowStep = "detail" | "confirmation" | "success";

export interface SelectedCard {
  brand: string;
  title: string;
  logo: React.ReactNode;
  offer: React.ReactNode;
}

export interface GiftCardPurchaseFlowProps {
  card: SelectedCard;
  onComplete: () => void;
  onClose: () => void;
}

export default function GiftCardPurchaseFlow({
  card,
  onComplete,
  onClose,
}: GiftCardPurchaseFlowProps) {
  const [step, setStep] = useState<FlowStep>("detail");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleBack = () => {
    setStep("detail");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  const handleDone = () => {
    onComplete();
  };

  if (step === "detail") {
    return (
      <Modal
        visible
        transparent
        animationType="none"
        onRequestClose={onClose}
      >
        <GCDetailModal
          logo={card.logo}
          title={`${card.title} gift card`}
          offer={card.offer}
          onClose={onClose}
          onContinue={(amount) => {
            setSelectedAmount(amount);
            setStep("confirmation");
          }}
          onFavorite={() => console.log("Favorite")}
        />
      </Modal>
    );
  }

  if (step === "confirmation") {
    return (
      <FullscreenTemplate
        title="Confirm purchase"
        navVariant="step"
        onLeftPress={handleBack}
        rightComponent={
          <FoldPressable onPress={() => console.log("Favorite")}>
            <StarIcon width={24} height={24} color={colorMaps.face.tertiary} />
          </FoldPressable>
        }
        footer={
          <ModalFooter
            type="default"
            primaryButton={
              <Button
                label="Buy gift card"
                hierarchy="primary"
                size="md"
                onPress={handleConfirm}
              />
            }
          />
        }
      >
        <GiftCardConfirmation
          brand={card.brand}
          brandLabel={card.title}
          amount={`$${selectedAmount}`}
          purchaseAmount={`$${((selectedAmount || 0) * 0.99).toFixed(2)}`}
          feeAmount={`+$${((selectedAmount || 0) * 0.01).toFixed(2)}`}
        />
      </FullscreenTemplate>
    );
  }

  // success
  return (
    <GiftCardSuccess
      brand={card.brand}
      brandLabel={card.title}
      amount={`$${selectedAmount}`}
      onClose={handleDone}
      onDone={handleDone}
      onRedeem={() => console.log("Redeem")}
      onViewDetails={() => console.log("View details")}
    />
  );
}
