import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../components/Keypad";
import { spacing } from "../../../components/tokens";

export interface OneTimeWithdrawEnterAmountProps {
  initialValue?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
}

export default function OneTimeWithdrawEnterAmount({
  initialValue = "0",
  actionLabel = "Continue",
  onActionPress,
}: OneTimeWithdrawEnterAmountProps) {
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
      <View style={styles.content}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={<TopContext variant="empty" />}
          bottomContextSlot={<BottomContext variant="empty" />}
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
