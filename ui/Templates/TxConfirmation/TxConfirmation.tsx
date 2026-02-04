import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
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
  /** Disclaimer text at the bottom */
  disclaimer?: string;
  /** Whether content is scrollable (default: true) */
  scrollable?: boolean;
}

export default function TxConfirmation({
  currencyInput,
  receiptDetails,
  footer,
  children,
  disclaimer,
  scrollable = true,
}: TxConfirmationProps) {
  // Use slots if provided, otherwise fall back to children
  const useSlots = currencyInput !== undefined || receiptDetails !== undefined;

  const contentElement = useSlots ? (
    <>
      {currencyInput}
      <Divider style={styles.divider} />
      {receiptDetails}
      {disclaimer && <Divider style={styles.dividerBottom} />}
    </>
  ) : (
    <>
      {children}
      {disclaimer && <Divider style={styles.dividerBottom} />}
    </>
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
          {disclaimer && (
            <View style={styles.disclaimerContainer}>
              {disclaimer.split("\n").map((paragraph, index) => (
                <FoldText
                  key={index}
                  type="body-sm"
                  style={[
                    styles.disclaimerText,
                    index > 0 && styles.disclaimerParagraph,
                  ]}
                >
                  {paragraph}
                </FoldText>
              ))}
            </View>
          )}
        </ScrollView>
      ) : (
        <>
          <View style={styles.content}>
            {contentElement}
          </View>
          {disclaimer && (
            <View style={styles.disclaimerContainer}>
              {disclaimer.split("\n").map((paragraph, index) => (
                <FoldText
                  key={index}
                  type="body-sm"
                  style={[
                    styles.disclaimerText,
                    index > 0 && styles.disclaimerParagraph,
                  ]}
                >
                  {paragraph}
                </FoldText>
              ))}
            </View>
          )}
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
    marginBottom: spacing["400"],
  },
  dividerBottom: {
    marginVertical: spacing["600"],
  },
  disclaimerContainer: {
    paddingHorizontal: spacing["500"],
  },
  disclaimerText: {
    color: colorMaps.face.tertiary,
  },
  disclaimerParagraph: {
    marginTop: spacing["200"],
  },
});
