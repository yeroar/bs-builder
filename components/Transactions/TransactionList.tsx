import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import ListItemTransaction from "../ListItem/Transaction/ListItemTransaction";
import LeftColumn from "../ListItem/code parts/LeftColumn";
import RightColumn from "../ListItem/code parts/RightColumn";
import PillSelector from "../PillSelector/PillSelector";
import { colorMaps, spacing } from "../tokens";
import { ALL_MOCK_TRANSACTIONS } from "./mockTransactions";

export type TransactionCategory = "Bitcoin" | "Cash" | "Rewards" | "Credit";

export interface TransactionData {
  id: string;
  title: string;
  date: string;
  amount: string;
  amountSecondary?: string;
  icon: React.ReactNode;
  category: TransactionCategory;
}

export interface TransactionListProps {
  transactions?: TransactionData[];
  title?: string;
  onTransactionPress?: (transaction: TransactionData) => void;
}

export default function TransactionList({
  transactions,
  title = "Transactions",
  onTransactionPress,
}: TransactionListProps) {
  const [activeCategory, setActiveCategory] = useState<TransactionCategory>("Bitcoin");

  const displayTransactions = transactions || ALL_MOCK_TRANSACTIONS;

  const filteredTransactions = displayTransactions.filter(
    (t) => t.category === activeCategory
  );

  const categories: TransactionCategory[] = ["Bitcoin", "Cash", "Rewards", "Credit"];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <FoldText type="header-md" style={styles.title}>
          {title}
        </FoldText>

        <View style={styles.pillContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillScrollContent}
          >
            {categories.map((cat) => (
              <PillSelector
                key={cat}
                label={cat}
                isActive={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
                size="md"
                style={styles.pill}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* List Section */}
      <View style={styles.list}>
        {filteredTransactions.map((tx) => (
          <ListItemTransaction
            key={tx.id}
            leadingSlot={tx.icon}
            leftColumn={
              <LeftColumn
                primaryText={tx.title}
                secondaryText={tx.date}
              />
            }
            rightColumn={
              <RightColumn
                primaryText={tx.amount}
                secondaryText={tx.amountSecondary}
              />
            }
            onPress={() => onTransactionPress?.(tx)}
          />
        ))}
        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <FoldText type="body-md" style={styles.emptyText}>
              No transactions for this category yet.
            </FoldText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  header: {
    paddingHorizontal: spacing["400"],
    paddingTop: spacing["200"],
    paddingBottom: spacing["400"],
    gap: spacing["400"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  pillContainer: {
    flexDirection: "row",
  },
  pillScrollContent: {
    gap: spacing["200"],
  },
  pill: {
    minWidth: 80,
  },
  divider: {
    height: 1,
    backgroundColor: colorMaps.border.tertiary,
    marginBottom: spacing["400"],
  },
  list: {
    paddingHorizontal: spacing["400"],
  },
  emptyState: {
    padding: spacing["800"],
    alignItems: "center",
  },
  emptyText: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
});
