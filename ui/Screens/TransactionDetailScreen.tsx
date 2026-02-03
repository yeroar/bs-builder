import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import TransactionHeader from "../../components/DataDisplay/Headers/TransactionHeader";
import BtcTxDetails from "../../components/Transactions/BtcTxDetails";
import Divider from "../../components/Primitives/Divider/Divider";
import Chip from "../../components/Primitives/Chip/Chip";
import { CheckCircleIcon } from "../../components/Icons/CheckCircleIcon";
import { ClockIcon } from "../../components/Icons/ClockIcon";
import { colorMaps, spacing } from "../../components/tokens";
import { TransactionData } from "../../components/Transactions/TransactionList";

export interface TransactionDetailScreenProps {
  transaction: TransactionData;
  onBack: () => void;
}

export default function TransactionDetailScreen({
  transaction,
  onBack,
}: TransactionDetailScreenProps) {
  // Determine transaction type based on title/amount
  const getTransactionType = (): "buy" | "sell" | "send" | "receive" => {
    const title = transaction.title.toLowerCase();
    if (title.includes("purchase") || title.includes("buy")) return "buy";
    if (title.includes("sell") || title.includes("swap")) return "sell";
    if (title.includes("send") || title.includes("withdraw")) return "send";
    if (title.includes("receive") || title.includes("deposit")) return "receive";
    // Default based on amount sign
    if (transaction.amount.startsWith("-")) return "sell";
    return "buy";
  };

  const txType = getTransactionType();

  // Format amount for display
  const formatAmount = () => {
    const amount = transaction.amountSecondary || transaction.amount;
    return amount.replace(/[+-]/, "");
  };

  return (
    <FullscreenTemplate leftIcon="back" onLeftPress={onBack}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TransactionHeader
          title={formatAmount()}
          subheader={`Bitcoin ${txType}`}
          footnote={transaction.date}
          leadingSlot={
            <Chip
              label="Push to card"
              type="success"
              leadingSlot={
                <CheckCircleIcon
                  width={12}
                  height={12}
                  color={colorMaps.face.positiveBold}
                />
              }
            />
          }
          trailingSlot={
            <Chip
              label="Withdrawal pending settlement"
              type="accent"
              leadingSlot={
                <ClockIcon
                  width={12}
                  height={12}
                  color={colorMaps.face.accentBold}
                />
              }
            />
          }
        />
        <Divider />
        <BtcTxDetails
          type={txType}
          bitcoinPrice="$100,000.00"
          amountPrimary="90,000 sats"
          amountSecondary="$90"
          processingFee="$10"
          total="$100"
        />
      </ScrollView>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
});
