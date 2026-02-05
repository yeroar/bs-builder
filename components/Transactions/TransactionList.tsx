import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ListItemTransaction from "../DataDisplay/ListItem/Transaction/ListItemTransaction";
import LeftColumn from "../DataDisplay/ListItem/code parts/LeftColumn";
import RightColumn from "../DataDisplay/ListItem/code parts/RightColumn";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing } from "../tokens";

export interface TransactionData {
  id: string;
  title: string;
  subtitle?: string;
  amount: string;
  amountSecondary?: string;
  date: string;
  type: "buy" | "sell" | "send" | "receive" | "deposit" | "withdrawal" | "purchase";
}

export interface TransactionListProps {
  transactions?: TransactionData[];
  onTransactionPress?: (transaction: TransactionData) => void;
}

const mockTransactions: TransactionData[] = [
  {
    id: "1",
    title: "Bitcoin purchase",
    subtitle: "Jan 15, 2025",
    amount: "+$100.00",
    amountSecondary: "~10,000 sats",
    date: "2025-01-15",
    type: "buy",
  },
  {
    id: "2",
    title: "Amazon Gift Card",
    subtitle: "Jan 14, 2025",
    amount: "-$50.00",
    amountSecondary: "5% back",
    date: "2025-01-14",
    type: "purchase",
  },
  {
    id: "3",
    title: "Direct deposit",
    subtitle: "Jan 12, 2025",
    amount: "+$2,500.00",
    date: "2025-01-12",
    type: "deposit",
  },
  {
    id: "4",
    title: "Bitcoin sold",
    subtitle: "Jan 10, 2025",
    amount: "+$75.00",
    amountSecondary: "~7,500 sats",
    date: "2025-01-10",
    type: "sell",
  },
  {
    id: "5",
    title: "Sent to wallet",
    subtitle: "Jan 8, 2025",
    amount: "-$25.00",
    amountSecondary: "~2,500 sats",
    date: "2025-01-08",
    type: "send",
  },
];

export default function TransactionList({
  transactions = mockTransactions,
  onTransactionPress,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FoldText type="body-md" style={styles.emptyText}>
          No transactions yet
        </FoldText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FoldText type="body-sm-bold" style={styles.sectionHeader}>
        Recent transactions
      </FoldText>
      {transactions.map((transaction, index) => (
        <ListItemTransaction
          key={transaction.id}
          leftColumn={
            <LeftColumn
              primaryText={transaction.title}
              secondaryText={transaction.subtitle}
            />
          }
          rightColumn={
            <RightColumn
              primaryText={transaction.amount}
              secondaryText={transaction.amountSecondary}
            />
          }
          showDivider={index < transactions.length - 1}
          onPress={() => onTransactionPress?.(transaction)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing["400"],
  },
  sectionHeader: {
    color: colorMaps.face.secondary,
    textTransform: "uppercase",
    marginBottom: spacing["300"],
    marginTop: spacing["400"],
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing["800"],
  },
  emptyText: {
    color: colorMaps.face.tertiary,
  },
});
