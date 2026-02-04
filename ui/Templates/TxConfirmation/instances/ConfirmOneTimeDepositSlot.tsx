import React from "react";
import TxConfirmation from "../TxConfirmation";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../components/modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { colorMaps } from "../../../../components/tokens";

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
      footer={
        <ModalFooter
          modalVariant="default"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Your deposit may take 1-5 business days to complete.
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
