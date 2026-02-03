import React from "react";
import { View, StyleSheet } from "react-native";
import TxConfirmation from "../TxConfirmation";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/CurrencyInput";
import ReceiptDetails from "../../../../components/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../components/modals/ModalFooter";
import Button from "../../../../components/Buttons/Button/Button";
import { spacing } from "../../../../components/tokens";

export interface ConfirmSellSlotProps {
  amount: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  saleAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  actionLabel?: string;
  onConfirmPress?: () => void;
  testID?: string;
}

// Format number with comma separators
const formatNumber = (num: number): string => {
  return String(Math.round(num)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export default function ConfirmSellSlot({
  amount = "$20",
  satsEquivalent = "~1,000 sats",
  bitcoinPrice = "$100,000.00",
  saleAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "+$1.00",
  actionLabel = "Confirm sell",
  onConfirmPress,
  testID,
}: ConfirmSellSlotProps) {
  return (
    <TxConfirmation>
      <View style={styles.content} testID={testID}>
        {/* Currency Input Section */}
        <View style={styles.currencySection}>
          <CurrencyInput
            value={amount}
            topContextSlot={<TopContext variant="btc" value={satsEquivalent} />}
            bottomContextSlot={<BottomContext variant="empty" />}
          />
        </View>

        {/* Receipt Details */}
        <View style={styles.detailsSection}>
          <ReceiptDetails>
            <ListItemReceipt label="Bitcoin price" value={bitcoinPrice} />
            <ListItemReceipt label="Amount" value={saleAmount} />
            <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
          </ReceiptDetails>
        </View>
      </View>

      {/* Footer */}
      <ModalFooter
        modalVariant="default"
        primaryButton={
          <Button
            label={actionLabel}
            hierarchy="primary"
            size="md"
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
});
