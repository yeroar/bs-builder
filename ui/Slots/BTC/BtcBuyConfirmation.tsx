import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { FoldText } from "../../../components/Primitives/FoldText";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { colorMaps } from "../../../components/tokens";

export interface BtcBuyConfirmationProps {
  amount: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  purchaseAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  actionLabel?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodBrand?: string;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onConfirmPress?: () => void;
  testID?: string;
}

export default function BtcBuyConfirmation({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  bitcoinPrice = "$100,000.00",
  purchaseAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "+$1.00",
  actionLabel = "Confirm purchase",
  paymentMethodVariant = "null",
  paymentMethodBrand,
  paymentMethodLabel,
  onPaymentMethodPress,
  onConfirmPress,
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
      footer={
        <ModalFooter
          modalVariant="default"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
              <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
                up to 14 days
              </FoldText>
              {" "}from purchase to unlock.
            </FoldText>
          }
          primaryButton={
            <Button
              label={actionLabel}
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
