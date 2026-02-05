import React from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../EnterAmount";
import useAmountInput from "../../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { spacing } from "../../../../../components/tokens";

export interface BtcBuyEnterAmountProps {
  initialValue?: string;
  maxAmount?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function BtcBuyEnterAmount({
  initialValue = "0",
  maxAmount = "$100.00",
  actionLabel = "Continue",
  onActionPress,
  testID,
}: BtcBuyEnterAmountProps) {
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
  } = useAmountInput({ initialValue });

  const calculateSatsEquivalent = (val: string) => {
    const numVal = parseFloat(val) || 0;
    if (numVal === 0) return "~฿0";
    const sats = Math.round(numVal * 0.000012 * 100000000);
    return `~${sats.toLocaleString()} sats`;
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
            <TopContext variant="btc" value={calculateSatsEquivalent(amount)} />
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
