import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Divider from "../../../components/Primitives/Divider/Divider";
import { colorMaps, spacing } from "../../../components/tokens";

export interface TxConfirmationProps {
  /** CurrencyInput slot */
  currencyInput?: React.ReactNode;
  /** ReceiptDetails slot */
  receiptDetails?: React.ReactNode;
  /** Footer slot (ModalFooter) - sticky at bottom */
  footer?: React.ReactNode;
  /** Children for custom layouts (used when currencyInput/receiptDetails not provided) */
  children?: React.ReactNode;
  /** Whether content is scrollable (default: true) */
  scrollable?: boolean;
}

export default function TxConfirmation({
  currencyInput,
  receiptDetails,
  footer,
  children,
  scrollable = true,
}: TxConfirmationProps) {
  // Use slots if provided, otherwise fall back to children
  const useSlots = currencyInput !== undefined || receiptDetails !== undefined;

  const contentElement = useSlots ? (
    <>
      {currencyInput}
      <Divider style={styles.divider} />
      {receiptDetails}
    </>
  ) : (
    children
  );

  return (
    <View style={styles.container}>
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {contentElement}
          </View>
        </ScrollView>
      ) : (
        <>
          <View style={styles.content}>
            {contentElement}
          </View>
          <View style={styles.spacer} />
        </>
      )}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: spacing["500"],
  },
  spacer: {
    flex: 1,
  },
  divider: {
    marginBottom: spacing["500"],
  },
});
