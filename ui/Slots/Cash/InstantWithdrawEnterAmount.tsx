import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../components/Keypad";
import { spacing } from "../../../components/tokens";

export interface InstantWithdrawEnterAmountProps {
  initialValue?: string;
  maxAmount?: string;
  maxAmountNum?: number;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
}

export default function InstantWithdrawEnterAmount({
  initialValue = "0",
  maxAmount = "$4,900.00",
  maxAmountNum = 4900,
  actionLabel = "Continue",
  onActionPress,
}: InstantWithdrawEnterAmountProps) {
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
    setAmount,
  } = useAmountInput({ initialValue });

  const numAmount = parseFloat(amount) || 0;
  const isOverMax = numAmount > maxAmountNum;

  const handleActionPress = () => {
    onActionPress?.(amount);
  };

  const handleMaxPress = () => {
    const numericMax = maxAmount.replace(/[^0-9.]/g, "");
    setAmount(numericMax);
  };

  return (
    <EnterAmount>
      <View style={styles.content}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={<TopContext variant="empty" />}
          bottomContextSlot={
            <BottomContext
              variant="maxButton"
              maxAmount={maxAmount}
              maxError={isOverMax}
              onMaxPress={handleMaxPress}
            />
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
        actionDisabled={isEmpty || isOverMax || numAmount < 1}
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
