import React, { useState } from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import RedeemBtcGiftCard from "../../../Slots/GiftCard/RedeemBtcGiftCard";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { useKeyboardVisible } from "../../../../hooks/useKeyboardVisible";

export interface RedeemGiftCardEntryScreenProps {
  onClose: () => void;
  onContinue: (cardNumber: string, pin: string) => void;
}

export default function RedeemGiftCardEntryScreen({
  onClose,
  onContinue,
}: RedeemGiftCardEntryScreenProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const keyboardVisible = useKeyboardVisible();

  const isFormValid = cardNumber.length > 0 && pin.length > 0;

  return (
    <FullscreenTemplate
      onLeftPress={onClose}
      scrollable
      keyboardAware
      footer={
        <ModalFooter
          type="default"
          modalVariant={keyboardVisible ? "keyboard" : undefined}
          disclaimer="Applicable bitcoin exchange fees may apply. Need a Bitcoin Gift Card?"
          primaryButton={
            <Button
              label="Continue"
              hierarchy="primary"
              size="md"
              disabled={!isFormValid}
              onPress={() => onContinue(cardNumber, pin)}
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
