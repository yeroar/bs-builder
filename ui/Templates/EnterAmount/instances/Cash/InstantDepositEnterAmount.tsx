import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../EnterAmount";
import useAmountInput from "../../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../../../components/tokens";

export interface InstantDepositEnterAmountProps {
  initialValue?: string;
  maxAmount?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function InstantDepositEnterAmount({
  initialValue = "0",
  maxAmount = "$500.00",
  actionLabel = "Continue",
  onActionPress,
  testID,
}: InstantDepositEnterAmountProps) {
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
    // Extract numeric value from maxAmount (e.g., "$500.00" -> "500.00")
    const numericMax = maxAmount.replace(/[^0-9.]/g, "");
    setAmount(numericMax);
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
