import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface InstantDepositConfirmationProps {
  amount: string;
  transferAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  testID?: string;
}

export default function InstantDepositConfirmation({
  amount = "$100",
  transferAmount = "$50.00",
  feePercentage = "1.5%",
  feeAmount = "+ $1.50",
  totalAmount = "$101.50",
  paymentMethodVariant = "cardAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  testID,
}: InstantDepositConfirmationProps) {
  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={amount}
          topContextVariant="empty"
          bottomContextVariant="paymentMethod"
          paymentMethodVariant={paymentMethodVariant}
          paymentMethodBrand={paymentMethodBrand}
          paymentMethodLabel={paymentMethodLabel}
          onPaymentMethodPress={onPaymentMethodPress}
          testID={testID}
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Transfer" value={transferAmount} />
          <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
          <ListItemReceipt label="Total" value={totalAmount} />
        </ReceiptDetails>
      }
      disclaimer="Deposit are limited to $15,000 per transfer, $150,000 per day, $50,000 per month, and a maximum total balance of $30,000."
    />
  );
}
