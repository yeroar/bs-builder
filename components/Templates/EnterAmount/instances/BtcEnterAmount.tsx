import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../EnterAmount";
import useAmountInput from "../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../CurrencyInput";
import { Keypad } from "../../../Keypad";
import { spacing } from "../../../tokens";

export interface BtcEnterAmountProps {
  initialValue?: string;
  maxAmount?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function BtcEnterAmount({
  initialValue = "0",
  maxAmount = "$100.00",
  actionLabel = "Continue",
  onActionPress,
  testID,
}: BtcEnterAmountProps) {
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
  } = useAmountInput({ initialValue });

  const calculateBtcEquivalent = (val: string) => {
    const numVal = parseFloat(val) || 0;
    const btcVal = numVal * 0.000012;
    if (btcVal === 0) return "~₿0";
    return `~₿${btcVal.toFixed(8).replace(/\.?0+$/, "")}`;
  };

  const handleActionPress = () => {
    onActionPress?.(amount);
  };

  return (
    <EnterAmount>
      <View style={styles.content} testID={testID}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={
            <TopContext variant="btc" value={calculateBtcEquivalent(amount)} />
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
