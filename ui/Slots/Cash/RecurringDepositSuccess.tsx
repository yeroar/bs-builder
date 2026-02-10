import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";

export interface RecurringDepositSuccessProps {
  amount: string;
  frequency: string;
  onViewDetails?: () => void;
}

export default function RecurringDepositSuccess({ amount, frequency, onViewDetails }: RecurringDepositSuccessProps) {
  return (
    <View style={styles.content}>
      <CurrencyInput
        value={amount}
        topContextSlot={<TopContext variant="frequency" value={frequency} />}
        bottomContextSlot={
          <BottomContext variant="maxButton">
            <Button
              label="View details"
              hierarchy="secondary"
              size="xs"
              onPress={onViewDetails}
            />
          </BottomContext>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
