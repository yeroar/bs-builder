import React from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import RedeemBtcGiftCardConfirmation from "../../../Slots/GiftCard/RedeemBtcGiftCardConfirmation";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";

export interface RedeemGiftCardConfirmationScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function RedeemGiftCardConfirmationScreen({
  onBack,
  onConfirm,
}: RedeemGiftCardConfirmationScreenProps) {
  return (
    <FullscreenTemplate
      title="Redeem gift card"
      navVariant="step"
      onLeftPress={onBack}
      footer={
        <ModalFooter
          type="default"
          disclaimer="Having trouble redeeming?"
          primaryButton={
            <Button
              label="Redeem"
              hierarchy="primary"
              size="md"
              onPress={onConfirm}
            />
          }
        />
      }
    >
      <RedeemBtcGiftCardConfirmation />
    </FullscreenTemplate>
  );
}
