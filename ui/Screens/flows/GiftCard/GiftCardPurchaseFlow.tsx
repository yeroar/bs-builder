import React, { useState } from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import GCDetailSlot from "../../../Slots/GiftCard/GCDetailSlot";
import GiftCardConfirmation from "../../../Slots/GiftCard/GiftCardConfirmation";
import GiftCardSuccess from "../../../Slots/GiftCard/GiftCardSuccess";
import FoldPressable from "../../../../components/Primitives/FoldPressable";
import { StarIcon } from "../../../../components/Icons/StarIcon";
import { colorMaps } from "../../../../components/tokens";

type FlowStep = "detail" | "confirmation" | "success";

export interface SelectedCard {
  brand: string;
  title: string;
  cashback: string;
  availability: string;
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

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleContinueToConfirmation = () => {
    if (selectedAmount) {
      setStep("confirmation");
    }
  };

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
      <FullscreenTemplate
        title={`${card.title} gift card`}
        onLeftPress={onClose}
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
                label="Continue"
                hierarchy="primary"
                size="md"
                disabled={!selectedAmount}
                onPress={handleContinueToConfirmation}
              />
            }
            secondaryButton={
              <Button
                label={`Favorite ${card.title}`}
                hierarchy="secondary"
                size="md"
                onPress={() => console.log("Favorite")}
              />
            }
          />
        }
      >
        <GCDetailSlot
          brand={card.brand}
          title={`${card.title} gift card`}
          satsBack={card.cashback}
          availability={card.availability}
          selectedAmount={selectedAmount}
          onAmountSelect={handleSelectAmount}
        />
      </FullscreenTemplate>
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
