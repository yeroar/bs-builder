import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../EnterAmount";
import useAmountInput from "../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/CurrencyInput";
import { Keypad } from "../../../../components/Keypad";
import { spacing } from "../../../../components/tokens";

export interface OneTimeDepositEnterAmountProps {
  initialValue?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function OneTimeDepositEnterAmount({
  initialValue = "0",
  actionLabel = "Continue",
  onActionPress,
  testID,
}: OneTimeDepositEnterAmountProps) {
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
  } = useAmountInput({ initialValue });

  const handleActionPress = () => {
    onActionPress?.(amount);
  };

  return (
    <EnterAmount>
      <View style={styles.content} testID={testID}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={
            <TopContext variant="empty" />
          }
          bottomContextSlot={
            <BottomContext variant="empty" />
          }
        />
      </View>

      <Keypad
        onNumberPress={handleNumberPress}
        onDecimalPress={handleDecimalPress}
        onBackspacePress={handleBackspacePress}
        disableDecimal={hasDecimal}
        actionBar
        actionLabel={actionLabel}
        actionDisabled={isEmpty}
        onActionPress={handleActionPress}
      />
    </EnterAmount>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
});
