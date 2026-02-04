import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../EnterAmount";
import useAmountInput from "../../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { spacing } from "../../../../../components/tokens";

export interface RecurringDepositEnterAmountProps {
  initialValue?: string;
  frequency?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function RecurringDepositEnterAmount({
  initialValue = "0",
  frequency = "Weekly",
  actionLabel = "Continue",
  onActionPress,
  testID,
}: RecurringDepositEnterAmountProps) {
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
            <TopContext variant="frequency" value={frequency} />
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
