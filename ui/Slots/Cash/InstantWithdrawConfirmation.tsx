import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface InstantWithdrawConfirmationProps {
  amount: string;
  transferAmount?: string;
  feeLabel?: string;
  feeAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
}

export default function InstantWithdrawConfirmation({
  amount = "$100",
  transferAmount = "$100.00",
  feeLabel = "Fees · 1.5%",
  feeAmount = "+ $1.50",
  totalAmount = "$101.50",
  paymentMethodVariant = "cardAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
}: InstantWithdrawConfirmationProps) {
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
          <ListItemReceipt label={feeLabel} value={feeAmount} />
          <ListItemReceipt label="Total" value={totalAmount} />
        </ReceiptDetails>
      }
      disclaimer="By confirming, you authorize Fold to initiate an instant withdrawal to your debit card. Funds are typically available within 30 minutes but may take up to 24 hours depending on your bank. A 1.5% fee applies to all instant withdrawals. This transaction cannot be reversed once initiated."
    />
  );
}
