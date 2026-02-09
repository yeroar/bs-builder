import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";

export interface RecurringDepositSuccessProps {
  amount: string;
  frequency: string;
  onDone: () => void;
}

export default function RecurringDepositSuccess({ amount, frequency, onDone }: RecurringDepositSuccessProps) {
  return (
    <>
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
                onPress={onDone}
              />
            </BottomContext>
          }
        />
      </View>
      <ModalFooter
        type="inverse"
        primaryButton={
          <Button
            label="Done"
            hierarchy="inverse"
            size="md"
            onPress={onDone}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
