import React from "react";
import RedeemBtcGiftCardSuccess from "../../../Slots/GiftCard/RedeemBtcGiftCardSuccess";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";

export interface RedeemGiftCardSuccessScreenProps {
  onDone: () => void;
}

export default function RedeemGiftCardSuccessScreen({
  onDone,
}: RedeemGiftCardSuccessScreenProps) {
  return (
    <RedeemBtcGiftCardSuccess
      onClose={onDone}
      footer={
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button label="Done" hierarchy="inverse" size="md" onPress={onDone} />
          }
        />
      }
    />
  );
}
