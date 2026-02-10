import React from "react";
import TransactionSuccess, { TransactionSuccessRef } from "../../Templates/Success/TransactionSuccess";
import FoldPageViewHeader from "../../../components/Navigation/TopNav/FoldPageViewHeader";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { CurrencyInput, BottomContext } from "../../../components/Inputs/CurrencyInput";

export interface RedeemBtcGiftCardSuccessProps {
  amount?: string;
  onClose?: () => void;
  onViewDetails?: () => void;
  /** Footer content provided by the flow */
  footer?: React.ReactNode;
  successRef?: React.RefObject<TransactionSuccessRef>;
}

export default function RedeemBtcGiftCardSuccess({
  amount = "$100",
  onClose,
  onViewDetails,
  footer,
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
          onLeftPress={onClose}
        />
      }
      footer={footer}
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
