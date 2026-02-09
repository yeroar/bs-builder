import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput } from "../../../components/Inputs/CurrencyInput";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";

export interface OneTimeWithdrawSuccessProps {
  amount: string;
  onDone: () => void;
}

export default function OneTimeWithdrawSuccess({ amount, onDone }: OneTimeWithdrawSuccessProps) {
  return (
    <>
      <View style={styles.content}>
        <CurrencyInput
          value={amount}
          topContextVariant="empty"
          bottomContextVariant="empty"
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
