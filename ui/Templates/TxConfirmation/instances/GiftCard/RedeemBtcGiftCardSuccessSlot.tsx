import React from "react";
import TransactionSuccessSlot, { TransactionSuccessSlotRef } from "../../../Success/TransactionSuccessSlot";
import FoldPageViewHeader from "../../../../../components/Navigation/TopNav/FoldPageViewHeader";
import ModalFooter from "../../../../../components/modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { CurrencyInput, BottomContext } from "../../../../../components/CurrencyInput";

export interface RedeemBtcGiftCardSuccessSlotProps {
  amount?: string;
  onDone?: () => void;
  onViewDetails?: () => void;
  successRef?: React.RefObject<TransactionSuccessSlotRef>;
}

export default function RedeemBtcGiftCardSuccessSlot({
  amount = "$100",
  onDone,
  onViewDetails,
  successRef,
}: RedeemBtcGiftCardSuccessSlotProps) {
  return (
    <TransactionSuccessSlot
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
    </TransactionSuccessSlot>
  );
}
