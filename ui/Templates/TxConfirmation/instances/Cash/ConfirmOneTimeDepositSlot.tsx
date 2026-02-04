import React from "react";
import TxConfirmation from "../../TxConfirmation";
import { CurrencyInput } from "../../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../../components/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../../components/modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";

export interface ConfirmOneTimeDepositSlotProps {
  amount: string;
  transferAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onConfirmPress?: () => void;
  testID?: string;
}

export default function ConfirmOneTimeDepositSlot({
  amount = "$100",
  transferAmount = "$100.00",
  totalAmount = "$100.00",
  paymentMethodVariant = "bankAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  onConfirmPress,
  testID,
}: ConfirmOneTimeDepositSlotProps) {
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
          <ListItemReceipt label="Total" value={totalAmount} />
        </ReceiptDetails>
      }
      disclaimer="Deposit are limited to $15,000 per transfer, $150,000 per day, $50,000 per month, and a maximum total balance of $30,000."
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button
              label="Confirm deposit"
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
