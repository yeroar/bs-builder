import React from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import Transactions, { TransactionCategory } from "../../../Slots/Transactions/Transactions";

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
      <Transactions defaultCategory={defaultCategory} />
    </FullscreenTemplate>
  );
}
