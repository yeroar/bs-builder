import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface OneTimeWithdrawConfirmationProps {
  amount: string;
  transferAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
}

export default function OneTimeWithdrawConfirmation({
  amount = "$100",
  transferAmount = "$100.00",
  totalAmount = "$100.00",
  paymentMethodVariant = "bankAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
}: OneTimeWithdrawConfirmationProps) {
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
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Transfer" value={transferAmount} />
          <ListItemReceipt label="Total" value={totalAmount} />
        </ReceiptDetails>
      }
      disclaimer="Withdrawals are limited to $15,000 per transfer, $150,000 per day, $50,000 per month."
    />
  );
}
