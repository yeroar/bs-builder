import React from "react";
import { View, StyleSheet } from "react-native";
import TxConfirmation from "../TxConfirmation";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../components/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../components/modals/ModalFooter";
import Button from "../../../../components/Buttons/Button/Button";
import { colorMaps, spacing } from "../../../../components/tokens";

export interface ConfirmBuySlotProps {
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

// Format number with comma separators
const formatNumber = (num: number): string => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format currency with comma separators
const formatCurrency = (num: number, decimals = 2): string => {
  const fixed = num.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${formattedInt}.${decPart}`;
};

// Format sats with comma separators
const formatSats = (sats: number): string => {
  return `~${formatNumber(sats)} sats`;
};

export default function ConfirmBuySlot({
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
}: ConfirmBuySlotProps) {
  return (
    <TxConfirmation>
      <View style={styles.content} testID={testID}>
        {/* Currency Input Section */}
        <View style={styles.currencySection}>
          <CurrencyInput
            value={amount}
            topContextVariant="btc"
            topContextValue={satsEquivalent}
            bottomContextVariant={paymentMethodVariant === "null" ? "addPaymentMethod" : "paymentMethod"}
            paymentMethodVariant={paymentMethodVariant}
            paymentMethodBrand={paymentMethodBrand}
            paymentMethodLabel={paymentMethodLabel}
            onPaymentMethodPress={onPaymentMethodPress}
          />
        </View>

        {/* Receipt Details */}
        <View style={styles.detailsSection}>
          <ReceiptDetails>
            <ListItemReceipt label="Bitcoin price" value={bitcoinPrice} />
            <ListItemReceipt label="Amount" value={purchaseAmount} />
            <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
          </ReceiptDetails>
        </View>
      </View>

      {/* Footer */}
      <ModalFooter
        modalVariant="default"
        disclaimer={
          <FoldText type="body-sm" style={styles.disclaimerText}>
            Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
            <FoldText type="body-sm-bold" style={styles.disclaimerBold}>
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
    </TxConfirmation>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  currencySection: {
    alignItems: "center",
    paddingHorizontal: spacing["400"],
  },
  detailsSection: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["400"],
  },
  disclaimerText: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
  disclaimerBold: {
    color: colorMaps.face.primary,
  },
});
