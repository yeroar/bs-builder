import React from "react";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import TransactionsSlot, { TransactionCategory } from "../Slots/Transactions/TransactionsSlot";

interface HistoryScreenProps {
  onBack: () => void;
  defaultCategory?: TransactionCategory;
}

export default function HistoryScreen({ onBack, defaultCategory }: HistoryScreenProps) {
  return (
    <FullscreenTemplate
      leftIcon="back"
      onLeftPress={onBack}
      scrollable
    >
      <TransactionsSlot defaultCategory={defaultCategory} />
    </FullscreenTemplate>
  );
}
