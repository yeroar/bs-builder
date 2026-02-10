import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../components/tokens";

export interface DirectToBitcoinConfirmProps {
  bitcoinPercentage?: number;
  cashPercentage?: number;
  processingFee?: string;
}

export default function DirectToBitcoinConfirm({
  bitcoinPercentage = 50,
  cashPercentage = 50,
  processingFee = "4%",
}: DirectToBitcoinConfirmProps) {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        header={`Invest ${bitcoinPercentage}% of direct deposits in bitcoin`}
        body="Total amount will vary based on the price of bitcoin and the amount of your paycheck deposited to Fold."
        hasDisclaimer={false}
      />
      <View style={styles.receiptContainer}>
        <ReceiptDetails>
          <ListItemReceipt label="Direct to bitcoin" value={`${bitcoinPercentage}% per deposit`} />
          <ListItemReceipt label="Direct to cash" value={`${cashPercentage}% per deposit`} />
          <ListItemReceipt label="Processing fees" value={processingFee} />
        </ReceiptDetails>
        <Divider />
        <FoldText type="body-sm" style={styles.disclaimer}>
          The minimum bitcoin purchase is $10. If your chosen percentage results in less than $10, the deposit will bypass the Direct to Bitcoin automation and will instead be added to your cash balance.
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  receiptContainer: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["600"],
  },
  disclaimer: {
    color: colorMaps.face.tertiary,
  },
});
