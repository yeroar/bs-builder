import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import ListItemReceipt from "../DataDisplay/ListItem/Receipt/ListItemReceipt";
import { colorMaps, spacing } from "../tokens";

export type BtcTxType = "buy" | "sell" | "send" | "receive";

export interface BtcTxDetailsProps {
  type: BtcTxType;
  // Price row (buy/sell)
  bitcoinPrice?: string;
  // Amount row
  amountLabel?: string;
  amountPrimary?: string;
  amountSecondary?: string;
  // Address row (send/receive)
  addressLabel?: string;
  address?: string;
  // Fee row
  processingFee?: string;
  hasFee?: boolean;
  // Total row
  total?: string;
  hasTotal?: boolean;
  style?: ViewStyle;
}

export default function BtcTxDetails({
  type,
  bitcoinPrice,
  amountLabel,
  amountPrimary,
  amountSecondary,
  addressLabel,
  address,
  processingFee,
  hasFee = true,
  total,
  hasTotal = true,
  style,
}: BtcTxDetailsProps) {
  // Determine labels based on type
  const getAmountLabel = () => {
    if (amountLabel) return amountLabel;
    switch (type) {
      case "buy":
        return "Purchase amount";
      case "sell":
        return "Sold amount";
      case "send":
        return "Send amount";
      case "receive":
        return "Received amount";
    }
  };

  const getAddressLabel = () => {
    if (addressLabel) return addressLabel;
    switch (type) {
      case "send":
        return "Address";
      case "receive":
        return "From";
      default:
        return "Address";
    }
  };

  const showBitcoinPrice = type === "buy" || type === "sell";
  const showAddress = type === "send" || type === "receive";
  const showFee = hasFee && type !== "receive";
  const showTotal = hasTotal && type !== "receive";

  return (
    <View style={[styles.container, style]}>
      {/* Bitcoin price row - buy/sell only */}
      {showBitcoinPrice && bitcoinPrice && (
        <ListItemReceipt
          label="Bitcoin price"
          value={bitcoinPrice}
          hasDenominator={false}
        />
      )}

      {/* Address row - send/receive only */}
      {showAddress && address && (
        <ListItemReceipt
          label={getAddressLabel()}
          value={address}
          hasDenominator={false}
        />
      )}

      {/* Amount row */}
      {amountPrimary && (
        <ListItemReceipt
          label={getAmountLabel()}
          value={amountPrimary}
          denominator={amountSecondary}
          hasDenominator={!!amountSecondary}
        />
      )}

      {/* Processing fee row */}
      {showFee && processingFee && (
        <ListItemReceipt
          label="Processing fee"
          value={processingFee}
          hasDenominator={false}
        />
      )}

      {/* Total row */}
      {showTotal && total && (
        <ListItemReceipt
          label="Total"
          value={total}
          hasDenominator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["400"],
  },
});
