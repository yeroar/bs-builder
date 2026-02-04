import React from "react";
import TxConfirmation from "../TxConfirmation";
import { CurrencyInput, TopContext } from "../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../components/modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";

export interface ConfirmRecurringDepositSlotProps {
  amount: string;
  frequency?: string;
  startingDate?: string;
  frequencyLabel?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onConfirmPress?: () => void;
  testID?: string;
}

export default function ConfirmRecurringDepositSlot({
  amount = "$100",
  frequency = "Weekly",
  startingDate = "9:00 AM Monday, Jan 15",
  frequencyLabel = "Weekly on Monday",
  paymentMethodVariant = "bankAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  onConfirmPress,
  testID,
}: ConfirmRecurringDepositSlotProps) {
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
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button
              label="Confirm recurring deposit"
              hierarchy="primary"
              size="md"
              disabled={paymentMethodVariant === "null"}
              onPress={onConfirmPress}
            />
          }
        />
      }
    />
  );
}
