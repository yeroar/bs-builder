import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps } from "../../../components/tokens";

export interface OneTimeWithdrawConfirmationProps {
  amount: string;
  transferAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onConfirmPress?: () => void;
}

export default function OneTimeWithdrawConfirmation({
  amount = "$100",
  transferAmount = "$100.00",
  totalAmount = "$100.00",
  paymentMethodVariant = "bankAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  onConfirmPress,
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
      footer={
        <ModalFooter
          type="default"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Your withdrawal may take 1-5 business days to complete.
            </FoldText>
          }
          primaryButton={
            <Button
              label="Confirm withdrawal"
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
