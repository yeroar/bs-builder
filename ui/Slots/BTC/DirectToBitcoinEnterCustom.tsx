import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../Templates/EnterAmount/EnterAmount";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../components/Keypad";
import { spacing } from "../../../components/tokens";

export interface DirectToBitcoinEnterCustomProps {
  initialValue?: number;
  onConfirm: (percentage: number) => void;
}

export default function DirectToBitcoinEnterCustom({
  initialValue = 0,
  onConfirm,
}: DirectToBitcoinEnterCustomProps) {
  const [input, setInput] = useState(initialValue.toString());

  const handleNumberPress = (num: string) => {
    setInput(prev => {
      if (prev === "0") return num;
      if (prev.length >= 3) return prev;
      return prev + num;
    });
  };

  const handleBackspacePress = () => {
    setInput(prev => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleConfirm = () => {
    const value = parseInt(input, 10) || 0;
    const clamped = Math.max(0, Math.min(100, value));
    onConfirm(clamped);
  };

  const isValid = parseInt(input, 10) > 0 && parseInt(input, 10) <= 100;

  return (
    <EnterAmount>
      <View style={styles.content}>
        <CurrencyInput
          value={`${input}%`}
          topContextSlot={
            <TopContext variant="btc" value="How much do you want to convert?" />
          }
          bottomContextSlot={
            <BottomContext variant="empty" />
          }
        />
      </View>

      <Keypad
        onNumberPress={handleNumberPress}
        onBackspacePress={handleBackspacePress}
        disableDecimal={true}
        actionBar
        actionLabel="Confirm"
        actionDisabled={!isValid}
        onActionPress={handleConfirm}
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
