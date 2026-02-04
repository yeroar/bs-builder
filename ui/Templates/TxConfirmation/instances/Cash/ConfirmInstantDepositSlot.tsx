import React from "react";
import TxConfirmation from "../../TxConfirmation";
import { CurrencyInput } from "../../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../../components/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../../components/modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { colorMaps } from "../../../../../components/tokens";

export interface ConfirmInstantDepositSlotProps {
  amount: string;
  transferAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  totalAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onConfirmPress?: () => void;
  testID?: string;
}

export default function ConfirmInstantDepositSlot({
  amount = "$100",
  transferAmount = "$50.00",
  feePercentage = "1.5%",
  feeAmount = "+ $1.50",
  totalAmount = "$101.50",
  paymentMethodVariant = "cardAccount",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  onConfirmPress,
  testID,
}: ConfirmInstantDepositSlotProps) {
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
      footer={
        <ModalFooter
          type="default"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Transfers time vary by bank. All transfers are subject to review and could be delayed or stopped at our discretion.
            </FoldText>
          }
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
