import React from "react";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import TransactionList, { TransactionData } from "../Transactions/TransactionList";

interface HistoryScreenProps {
  onBack: () => void;
  onTransactionPress?: (transaction: TransactionData) => void;
}

export default function HistoryScreen({ onBack, onTransactionPress }: HistoryScreenProps) {
  return (
    <FullscreenTemplate
      leftIcon="back"
      onLeftPress={onBack}
    >
      <TransactionList onTransactionPress={onTransactionPress} />
    </FullscreenTemplate>
  );
}
