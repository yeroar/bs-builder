import React, { useState } from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import RedeemBtcGiftCard from "../../../Slots/GiftCard/RedeemBtcGiftCard";
import RedeemBtcGiftCardConfirmation from "../../../Slots/GiftCard/RedeemBtcGiftCardConfirmation";
import RedeemBtcGiftCardSuccess from "../../../Slots/GiftCard/RedeemBtcGiftCardSuccess";

type RedeemStep = "entry" | "confirmation" | "success";

export interface RedeemGiftCardFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function RedeemGiftCardFlow({ onComplete, onClose }: RedeemGiftCardFlowProps) {
  const [step, setStep] = useState<RedeemStep>("entry");
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");

  const isFormValid = cardNumber.length > 0 && pin.length > 0;

  const handleContinue = () => setStep("confirmation");
  const handleBack = () => setStep("entry");
  const handleConfirm = () => setStep("success");
  const handleDone = () => {
    onComplete();
  };

  if (step === "entry") {
    return (
      <FullscreenTemplate
        onLeftPress={onClose}
        scrollable
        footer={
          <ModalFooter
            type="default"
            disclaimer="Applicable bitcoin exchange fees may apply. Need a Bitcoin Gift Card?"
            primaryButton={
              <Button
                label="Continue"
                hierarchy="primary"
                size="md"
                disabled={!isFormValid}
                onPress={handleContinue}
              />
            }
          />
        }
      >
        <RedeemBtcGiftCard
          cardNumber={cardNumber}
          pin={pin}
          onCardNumberChange={setCardNumber}
          onPinChange={setPin}
        />
      </FullscreenTemplate>
    );
  }

  if (step === "confirmation") {
    return (
      <FullscreenTemplate
        title="Redeem gift card"
        navVariant="step"
        onLeftPress={handleBack}
        footer={
          <ModalFooter
            type="default"
            disclaimer="Having trouble redeeming?"
            primaryButton={
              <Button
                label="Redeem"
                hierarchy="primary"
                size="md"
                onPress={handleConfirm}
              />
            }
          />
        }
      >
        <RedeemBtcGiftCardConfirmation />
      </FullscreenTemplate>
    );
  }

  // success
  return (
    <RedeemBtcGiftCardSuccess
      onClose={handleDone}
      footer={
        <ModalFooter
          primaryButton={
            <Button label="Done" hierarchy="inverse" size="md" onPress={handleDone} />
          }
        />
      }
    />
  );
}
