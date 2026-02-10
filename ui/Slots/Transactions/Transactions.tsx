import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import { FoldText } from "../../../components/Primitives/FoldText";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps, spacing, radius } from "../../../components/tokens";

// Icons for Bitcoin transactions
import { CheckCircleIcon } from "../../../components/Icons/CheckCircleIcon";
import { SwitchHorizontalIcon } from "../../../components/Icons/SwitchHorizontalIcon";
import DirectToBitcoinIcon from "../../../components/Icons/DirectToBitcoinIcon";
import { CoinsStackedIcon } from "../../../components/Icons/CoinsStackedIcon";
import { ArrowNarrowUpIcon } from "../../../components/Icons/ArrowNarrowUpIcon";
import { CreditCardDownloadIcon } from "../../../components/Icons/CreditCardDownloadIcon";

// Icons for Cash/Credit transactions
import CreditCardIcon from "../../../components/Icons/CreditCardIcon";
import { BankIcon } from "../../../components/Icons/BankIcon";

// Icon for Rewards
import { NavBTCFilledIcon } from "../../../components/Icons/NavBTCFilledIcon";

export type TransactionCategory = "bitcoin" | "cash" | "credit" | "rewards" | "foldPlus";

export interface TransactionItem {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  secondaryAmount?: string;
  icon?: React.ReactNode;
  brand?: string;
}

export interface TransactionsProps {
  defaultCategory?: TransactionCategory;
  onCategoryChange?: (category: TransactionCategory) => void;
  bitcoinTransactions?: TransactionItem[];
  cashTransactions?: TransactionItem[];
  creditTransactions?: TransactionItem[];
  rewardsTransactions?: TransactionItem[];
  foldPlusTransactions?: TransactionItem[];
  onTransactionPress?: (transaction: TransactionItem) => void;
}

const CATEGORIES: { key: TransactionCategory; label: string }[] = [
  { key: "bitcoin", label: "Bitcoin" },
  { key: "cash", label: "Cash" },
  { key: "credit", label: "Credit" },
  { key: "rewards", label: "Rewards" },
  { key: "foldPlus", label: "Fold+" },
];

const defaultBitcoinTransactions: TransactionItem[] = [
  {
    id: "btc-1",
    title: "Bitcoin buy",
    subtitle: "Today",
    amount: "$100.00",
    secondaryAmount: "Pending",
    icon: <CheckCircleIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "btc-2",
    title: "Bitcoin sale",
    subtitle: "Today",
    amount: "$100.00",
    secondaryAmount: "Pending",
    icon: <SwitchHorizontalIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "btc-3",
    title: "Direct to bitcoin",
    subtitle: "Dec 17",
    amount: "$100.00",
    secondaryAmount: "100,000 sats",
    icon: <DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "btc-4",
    title: "Auto stack",
    subtitle: "Dec 17",
    amount: "$100.00",
    secondaryAmount: "100,000 sats",
    icon: <CoinsStackedIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "btc-5",
    title: "Bitcoin send",
    subtitle: "Dec 17",
    amount: "$100.00",
    secondaryAmount: "100,000 sats",
    icon: <ArrowNarrowUpIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "btc-6",
    title: "Bitcoin received",
    subtitle: "Dec 17",
    amount: "$100.00",
    secondaryAmount: "100,000 sats",
    icon: <CreditCardDownloadIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
];

const defaultCashTransactions: TransactionItem[] = [
  {
    id: "cash-1",
    title: "Wells Fargo \u2022\u2022\u2022 0684",
    subtitle: "Pending",
    amount: "$105.23",
    icon: <BankIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "cash-2",
    title: "Adobe",
    subtitle: "Today",
    amount: "$432.18",
    secondaryAmount: "Dispute",
    icon: <CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "cash-3",
    title: "Mastercard \u2022\u2022\u2022 0875",
    subtitle: "Dec 9",
    amount: "$218.34",
    brand: "mastercard",
  },
  {
    id: "cash-4",
    title: "Chewy gift card",
    subtitle: "Dec 7",
    amount: "$218.34",
    secondaryAmount: "892 sats",
    brand: "chewy",
  },
  {
    id: "cash-5",
    title: "Uber",
    subtitle: "Dec 7",
    amount: "$218.34",
    secondaryAmount: "892 sats",
    brand: "uber",
  },
  {
    id: "cash-6",
    title: "Fold+ subscription",
    subtitle: "Dec 1",
    amount: "$15",
    icon: <CheckCircleIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
];

const defaultRewardsTransactions: TransactionItem[] = [
  {
    id: "rew-1",
    title: "Card reward",
    subtitle: "Pending",
    amount: "$0.60",
    secondaryAmount: "105 sats",
    icon: <NavBTCFilledIcon width={20} height={20} color={colorMaps.face.accentBold} />,
  },
  {
    id: "rew-2",
    title: "Card reward",
    subtitle: "Today",
    amount: "$0.60",
    secondaryAmount: "105 sats",
    icon: <NavBTCFilledIcon width={20} height={20} color={colorMaps.face.accentBold} />,
  },
  {
    id: "rew-3",
    title: "Card reward",
    subtitle: "Yesterday",
    amount: "< $0.01",
    secondaryAmount: "10 sats",
    icon: <NavBTCFilledIcon width={20} height={20} color={colorMaps.face.accentBold} />,
  },
  {
    id: "rew-4",
    title: "Card reward",
    subtitle: "Dec 17",
    amount: "$0.33",
    secondaryAmount: "302 sats",
    icon: <NavBTCFilledIcon width={20} height={20} color={colorMaps.face.accentBold} />,
  },
];

const defaultCreditTransactions: TransactionItem[] = [
  {
    id: "cred-1",
    title: "United Airlines",
    subtitle: "Pending",
    amount: "$1,282.13",
    secondaryAmount: "55,568 sats",
    icon: <CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "cred-2",
    title: "Presidio Trust Parking",
    subtitle: "Today",
    amount: "$12.50",
    secondaryAmount: "55,568 sats",
    icon: <CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
  {
    id: "cred-3",
    title: "Payment",
    subtitle: "Dec 8",
    amount: "$830.23",
    icon: <CheckCircleIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
];

const defaultFoldPlusTransactions: TransactionItem[] = [
  {
    id: "fp-1",
    title: "Fold+ subscription",
    subtitle: "Dec 1",
    amount: "$15",
    icon: <CheckCircleIcon width={20} height={20} color={colorMaps.face.primary} />,
  },
];

export default function Transactions({
  defaultCategory = "bitcoin",
  onCategoryChange,
  bitcoinTransactions = defaultBitcoinTransactions,
  cashTransactions = defaultCashTransactions,
  creditTransactions = defaultCreditTransactions,
  rewardsTransactions = defaultRewardsTransactions,
  foldPlusTransactions = defaultFoldPlusTransactions,
  onTransactionPress,
}: TransactionsProps) {
  const [activeCategory, setActiveCategory] = useState<TransactionCategory>(defaultCategory ?? "bitcoin");

  const handleCategoryPress = (category: TransactionCategory) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const getTransactions = (): TransactionItem[] => {
    switch (activeCategory) {
      case "bitcoin": return bitcoinTransactions;
      case "cash": return cashTransactions;
      case "credit": return creditTransactions;
      case "rewards": return rewardsTransactions;
      case "foldPlus": return foldPlusTransactions;
    }
  };

  const transactions = getTransactions();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FoldText type="header-lg" style={styles.headerText}>
          Transactions
        </FoldText>
      </View>

      {/* Category Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsContainer}
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.key;
          return (
            <FoldPressable
              key={category.key}
              onPress={() => handleCategoryPress(category.key)}
            >
              <View
                style={[
                  styles.pill,
                  isActive ? styles.pillActive : styles.pillInactive,
                ]}
              >
                <FoldText
                  type="body-md"
                  style={[
                    styles.pillText,
                    isActive ? styles.pillTextActive : styles.pillTextInactive,
                  ]}
                >
                  {category.label}
                </FoldText>
              </View>
            </FoldPressable>
          );
        })}
      </ScrollView>

      {/* Transaction List */}
      <View style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            variant="transaction"
            title={transaction.title}
            secondaryText={transaction.subtitle}
            rightTitle={transaction.amount}
            rightSecondaryText={transaction.secondaryAmount}
            leadingSlot={
              transaction.brand ? (
                <IconContainer brand={transaction.brand} size="lg" />
              ) : (
                <IconContainer
                  icon={transaction.icon}
                  variant="default-fill"
                  size="lg"
                />
              )
            }
            onPress={onTransactionPress ? () => onTransactionPress(transaction) : undefined}
          />
        ))}
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
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
    paddingBottom: spacing["400"],
  },
  headerText: {
    color: colorMaps.face.primary,
  },
  pillsContainer: {
    flexDirection: "row",
    gap: spacing["200"],
    paddingHorizontal: spacing["500"],
    paddingBottom: spacing["400"],
  },
  pill: {
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["200"],
    borderRadius: radius.rounded,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: colorMaps.object.primary.bold.default,
    borderColor: colorMaps.object.primary.bold.default,
  },
  pillInactive: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderColor: colorMaps.border.tertiary,
  },
  pillText: {},
  pillTextActive: {
    color: colorMaps.face.primary,
  },
  pillTextInactive: {
    color: colorMaps.face.secondary,
  },
  transactionsList: {
    paddingHorizontal: spacing["500"],
  },
});
