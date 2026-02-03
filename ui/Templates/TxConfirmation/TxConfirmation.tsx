import React from "react";
import { View, StyleSheet } from "react-native";
import Divider from "../../../components/Divider/Divider";
import { colorMaps, spacing } from "../../../components/tokens";

export interface TxConfirmationProps {
  /** CurrencyInput slot */
  currencyInput?: React.ReactNode;
  /** ReceiptDetails slot */
  receiptDetails?: React.ReactNode;
  /** Footer slot (ModalFooter) */
  footer?: React.ReactNode;
  /** Children for custom layouts (used when currencyInput/receiptDetails not provided) */
  children?: React.ReactNode;
}

export default function TxConfirmation({
  currencyInput,
  receiptDetails,
  footer,
  children,
}: TxConfirmationProps) {
  // Use slots if provided, otherwise fall back to children
  const useSlots = currencyInput !== undefined || receiptDetails !== undefined;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {useSlots ? (
          <>
            {currencyInput}
            <Divider />
            {receiptDetails}
          </>
        ) : (
          children
        )}
      </View>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing["500"],
  },
});
