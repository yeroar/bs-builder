import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import Divider from "../../../components/Primitives/Divider/Divider";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import { Frequency } from "./Btc";
import { spacing } from "../../../components/tokens";

export interface BtcAutoStackDetailsProps {
  amount?: number;
  frequency: Frequency;
  nextPurchase?: string;
  purchaseAmount?: string;
  feeLabel?: string;
  feeValue?: string;
  totalCost?: string;
}

export default function BtcAutoStackDetails({
  amount = 100,
  frequency,
  nextPurchase = "$50.00",
  purchaseAmount = "+ $1.50",
  feeLabel = "Fees • 0%",
  feeValue = "Market price",
  totalCost,
}: BtcAutoStackDetailsProps) {
  const displayTotal = totalCost || `$${amount.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <CurrencyInput
        value={`$${amount.toFixed(0)}`}
        topContextSlot={<TopContext variant="frequency" value={frequency} />}
        bottomContextSlot={<BottomContext variant="empty" />}
      />
      <View style={styles.receipt}>
        <Divider />
        <ReceiptDetails>
          <ListItemReceipt label="Next purchase" value={nextPurchase} />
          <ListItemReceipt label="Purchase amount" value={purchaseAmount} />
          <ListItemReceipt label={feeLabel} value={feeValue} />
          <ListItemReceipt label="Total cost" value={displayTotal} />
        </ReceiptDetails>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
  receipt: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
  },
});
