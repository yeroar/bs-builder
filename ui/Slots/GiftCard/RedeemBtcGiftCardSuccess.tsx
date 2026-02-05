import React from "react";
import TransactionSuccess, { TransactionSuccessRef } from "../../Templates/Success/TransactionSuccess";
import FoldPageViewHeader from "../../../components/Navigation/TopNav/FoldPageViewHeader";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { CurrencyInput, BottomContext } from "../../../components/Inputs/CurrencyInput";

export interface RedeemBtcGiftCardSuccessProps {
  amount?: string;
  onDone?: () => void;
  onViewDetails?: () => void;
  successRef?: React.RefObject<TransactionSuccessRef>;
}

export default function RedeemBtcGiftCardSuccess({
  amount = "$100",
  onDone,
  onViewDetails,
  successRef,
}: RedeemBtcGiftCardSuccessProps) {
  return (
    <TransactionSuccess
      ref={successRef}
      header={
        <FoldPageViewHeader
          variant="fullscreen"
          title="Gift card redeemed"
          leftIcon="x"
          onLeftPress={onDone}
        />
      }
      footer={
        <ModalFooter
          primaryButton={
            <Button label="Done" hierarchy="inverse" size="md" onPress={onDone} />
          }
        />
      }
    >
      <CurrencyInput
        value={amount}
        topContextVariant="giftcard"
        topContextValue="Bitcoin Gift Card"
        bottomContextSlot={
          <BottomContext variant="maxButton">
            <Button label="View details" hierarchy="secondary" size="xs" onPress={onViewDetails} />
          </BottomContext>
        }
      />
    </TransactionSuccess>
  );
}
