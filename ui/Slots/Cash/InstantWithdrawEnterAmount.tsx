import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../components/Keypad";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";

export interface InstantWithdrawEnterAmountProps {
  initialValue?: string;
  maxAmount?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
}

export default function InstantWithdrawEnterAmount({
  initialValue = "0",
  maxAmount = "$4,900.00",
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
            <BottomContext variant="maxButton">
              <Button
                label={`Max ${maxAmount}`}
                hierarchy="secondary"
                size="xs"
                onPress={handleMaxPress}
              />
            </BottomContext>
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
