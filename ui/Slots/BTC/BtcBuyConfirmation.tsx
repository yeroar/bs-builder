import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface BtcBuyConfirmationProps {
  amount: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  purchaseAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  testID?: string;
}

export default function BtcBuyConfirmation({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  bitcoinPrice = "$100,000.00",
  purchaseAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "+$1.00",
  paymentMethodVariant = "null",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  testID,
}: BtcBuyConfirmationProps) {
  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={amount}
          topContextVariant="btc"
          topContextValue={satsEquivalent}
          bottomContextVariant={paymentMethodVariant === "null" ? "addPaymentMethod" : "paymentMethod"}
          paymentMethodVariant={paymentMethodVariant}
          paymentMethodBrand={paymentMethodBrand}
          paymentMethodLabel={paymentMethodLabel}
          onPaymentMethodPress={onPaymentMethodPress}
          testID={testID}
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Bitcoin price" value={bitcoinPrice} />
          <ListItemReceipt label="Amount" value={purchaseAmount} />
          <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
        </ReceiptDetails>
      }
    />
  );
}
