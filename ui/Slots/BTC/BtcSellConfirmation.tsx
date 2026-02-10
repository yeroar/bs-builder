import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface BtcSellConfirmationProps {
  amount: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  saleAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  testID?: string;
}

export default function BtcSellConfirmation({
  amount = "$20",
  satsEquivalent = "~1,000 sats",
  bitcoinPrice = "$100,000.00",
  saleAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "+$1.00",
  testID,
}: BtcSellConfirmationProps) {
  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={amount}
          topContextSlot={<TopContext variant="btc" value={satsEquivalent} />}
          bottomContextSlot={<BottomContext variant="empty" />}
          testID={testID}
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Bitcoin price" value={bitcoinPrice} />
          <ListItemReceipt label="Amount" value={saleAmount} />
          <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
        </ReceiptDetails>
      }
    />
  );
}
