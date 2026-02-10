import React from "react";
import { View, StyleSheet } from "react-native";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import PmSelector from "../../../components/Inputs/CurrencyInput/PmSelector";
import Chip from "../../../components/Primitives/Chip/Chip";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../components/tokens";

export interface RecurringDepositDetailsSlotProps {
  state?: "active" | "paused";
  started?: string;
  frequency?: string;
  nextDeposit?: string;
  bankLabel?: string;
  onBankPress?: () => void;
}

export default function RecurringDepositDetailsSlot({
  state = "active",
  started = "H:MM AM Day, Mon DD",
  frequency = "Weekly on Day",
  nextDeposit = "Friday, Oct 10",
  bankLabel = "bankAccount 1234",
  onBankPress,
}: RecurringDepositDetailsSlotProps) {
  const isPaused = state === "paused";

  return (
    <View style={styles.container}>
      <ListItemReceipt label="Started" value={started} />

      {isPaused ? (
        <View style={[styles.row, styles.frequencyRow]}>
          <FoldText type="body-md" style={styles.label}>Frequency</FoldText>
          <Chip label="Paused" type="accent" bold />
        </View>
      ) : (
        <ListItemReceipt label="Frequency" value={frequency} />
      )}

      <ListItemReceipt
        label="Next deposit"
        value={isPaused ? "n/a" : nextDeposit}
      />

      <View style={styles.row}>
        <FoldText type="body-md" style={styles.label}>From</FoldText>
        <PmSelector
          variant="bankAccount"
          label={bankLabel}
          onPress={onBankPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing["400"],
  },
  frequencyRow: {
    minHeight: 52,
  },
  label: {
    color: colorMaps.face.secondary,
  },
});
