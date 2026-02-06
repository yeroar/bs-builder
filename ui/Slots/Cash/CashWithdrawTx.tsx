import React from "react";
import { View, StyleSheet } from "react-native";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";

interface CashWithdrawTxProps {
  type: "instant" | "oneTime";
  transferAmount: string;
  feeLabel?: string;
  feeAmount?: string;
  totalAmount: string;
}

export default function CashWithdrawTx({
  type,
  transferAmount,
  feeLabel,
  feeAmount,
  totalAmount,
}: CashWithdrawTxProps) {
  return (
    <View style={styles.container}>
      <ListItemReceipt label="Transfer" value={transferAmount} />
      {type === "instant" && feeLabel && feeAmount && (
        <ListItemReceipt label={feeLabel} value={feeAmount} />
      )}
      <ListItemReceipt label="Total" value={totalAmount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
