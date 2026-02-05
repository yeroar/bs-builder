import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing } from "../tokens";

export interface BtcTxDetailsProps {
  type: "buy" | "sell" | "send" | "receive";
  bitcoinPrice?: string;
  amountPrimary?: string;
  amountSecondary?: string;
  processingFee?: string;
  total?: string;
}

interface DetailRowProps {
  label: string;
  value: string;
  valueSecondary?: string;
  isBold?: boolean;
}

function DetailRow({ label, value, valueSecondary, isBold = false }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <FoldText type="body-md" style={styles.label}>
        {label}
      </FoldText>
      <View style={styles.valueContainer}>
        <FoldText type={isBold ? "body-md-bold" : "body-md"} style={styles.value}>
          {value}
        </FoldText>
        {valueSecondary && (
          <FoldText type="body-sm" style={styles.valueSecondary}>
            {valueSecondary}
          </FoldText>
        )}
      </View>
    </View>
  );
}

export default function BtcTxDetails({
  type,
  bitcoinPrice = "$100,000.00",
  amountPrimary = "10,000 sats",
  amountSecondary = "$10.00",
  processingFee = "$0.00",
  total = "$10.00",
}: BtcTxDetailsProps) {
  const getTypeLabel = () => {
    switch (type) {
      case "buy":
        return "Bitcoin purchased";
      case "sell":
        return "Bitcoin sold";
      case "send":
        return "Bitcoin sent";
      case "receive":
        return "Bitcoin received";
      default:
        return "Amount";
    }
  };

  return (
    <View style={styles.container}>
      <FoldText type="body-sm-bold" style={styles.sectionHeader}>
        Transaction details
      </FoldText>

      <View style={styles.detailsContainer}>
        <DetailRow label="Bitcoin price" value={bitcoinPrice} />
        <DetailRow
          label={getTypeLabel()}
          value={amountPrimary}
          valueSecondary={amountSecondary}
        />
        <DetailRow label="Processing fee" value={processingFee} />
        <View style={styles.divider} />
        <DetailRow label="Total" value={total} isBold />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["400"],
  },
  sectionHeader: {
    color: colorMaps.face.secondary,
    textTransform: "uppercase",
    marginBottom: spacing["300"],
  },
  detailsContainer: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderRadius: 12,
    padding: spacing["400"],
    gap: spacing["300"],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  label: {
    color: colorMaps.face.secondary,
  },
  valueContainer: {
    alignItems: "flex-end",
  },
  value: {
    color: colorMaps.face.primary,
  },
  valueSecondary: {
    color: colorMaps.face.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colorMaps.border.secondary,
    marginVertical: spacing["100"],
  },
});
