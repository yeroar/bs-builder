import React from "react";
import TxConfirmation from "../../TxConfirmation";
import { CurrencyInput, BottomContext } from "../../../../../components/CurrencyInput";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";

export interface RedeemBtcGiftCardConfirmationProps {
  amount?: string;
  giftCardAmount?: string;
  processingFee?: string;
  totalAmount?: string;
  totalSats?: string;
  disclaimer?: string;
}

const DEFAULT_DISCLAIMER = "The bitcoin amount of your gift card may fluctuate over time. Complete redemption to lock in the bitcoin value.";

export default function RedeemBtcGiftCardConfirmation({
  amount = "$100",
  giftCardAmount = "$100.00",
  processingFee = "$1.50",
  totalAmount = "$98.50",
  totalSats = "88,532 sats",
  disclaimer = DEFAULT_DISCLAIMER,
}: RedeemBtcGiftCardConfirmationProps) {
  return (
    <TxConfirmation
      disclaimer={disclaimer}
      currencyInput={
        <CurrencyInput
          value={amount}
          topContextVariant="giftcard"
          topContextValue="Bitcoin Gift Card"
          bottomContextSlot={
            <BottomContext variant="maxButton">
              <Button label="Quote refreshes in 60s" hierarchy="tertiary" size="xs" />
            </BottomContext>
          }
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Gift card amount" value={giftCardAmount} hasDenominator={false} />
          <ListItemReceipt label="Processing fee" value={processingFee} hasDenominator={false} />
          <ListItemReceipt label="Total" value={totalAmount} denominator={totalSats} />
        </ReceiptDetails>
      }
    />
  );
}
