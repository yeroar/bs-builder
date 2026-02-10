import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput, TopContext } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

export interface RecurringDepositConfirmationProps {
  amount: string;
  frequency?: string;
  startingDate?: string;
  frequencyLabel?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  testID?: string;
}

export default function RecurringDepositConfirmation({
  amount = "$100",
  frequency = "Weekly",
  startingDate = "9:00 AM Monday, Jan 15",
  frequencyLabel = "Weekly on Monday",
  paymentMethodVariant = "bankAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  testID,
}: RecurringDepositConfirmationProps) {
  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={amount}
          topContextSlot={<TopContext variant="frequency" value={frequency} />}
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
          <ListItemReceipt label="Starting" value={startingDate} />
          <ListItemReceipt label="Frequency" value={frequencyLabel} />
        </ReceiptDetails>
      }
      disclaimer={"Deposits are limited to $15,000 per transfer, $15,000 per day, $40,000 per month, and a maximum total balance of $30,000.\nDeposits are limited to $15,000 per transfer, $15,000 per day, $40,000 per month, and a maximum total balance of $30,000.\nDeposits will initiate on the date chosen and require at least two business days to complete. Please schedule recurring deposits accordingly."}
    />
  );
}
