import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../EnterAmount";
import useAmountInput from "../../useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import Toast from "../../../../../components/Feedback/Toast/Toast";
import { spacing } from "../../../../../components/tokens";

export interface BtcSellEnterAmountProps {
  initialValue?: string;
  maxBtcAmount?: string;
  btcPrice?: number;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
  testID?: string;
}

export default function BtcSellEnterAmount({
  initialValue = "0",
  maxBtcAmount = "0.07",
  btcPrice = 100000,
  actionLabel = "Continue",
  onActionPress,
  testID,
}: BtcSellEnterAmountProps) {
  const [showToast, setShowToast] = useState(false);
  const maxUsdAmount = parseFloat(maxBtcAmount) * btcPrice;

  const {
    amount,
    setAmount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
    formatWithCommas,
  } = useAmountInput({
    initialValue,
    maxAmount: maxUsdAmount,
    onMaxExceeded: () => setShowToast(true),
  });

  const calculateBtcEquivalent = (usdVal: string) => {
    const numVal = parseFloat(usdVal) || 0;
    const btcVal = numVal / btcPrice;
    if (btcVal === 0) return "~₿0";
    return `~₿${btcVal.toFixed(8).replace(/\.?0+$/, "")}`;
  };

  const handleMaxPress = () => {
    const maxUsd = parseFloat(maxBtcAmount) * btcPrice;
    setAmount(String(Math.floor(maxUsd)));
  };

  const handleActionPress = () => {
    onActionPress?.(amount);
  };

  return (
    <EnterAmount>
      {showToast && (
        <View style={styles.toastContainer}>
          <Toast
            message={`Max amount is $${formatWithCommas(String(Math.floor(maxUsdAmount)))}`}
            type="error"
            autoDismiss
            autoDismissDelay={3000}
            onDismiss={() => setShowToast(false)}
          />
        </View>
      )}
      <View style={styles.content} testID={testID}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={
            <TopContext variant="btc" value={calculateBtcEquivalent(amount)} />
          }
          bottomContextSlot={
            isEmpty ? (
              <BottomContext variant="maxButton">
                <Button
                  label={`Max ₿${maxBtcAmount}`}
                  hierarchy="secondary"
                  size="xs"
                  onPress={handleMaxPress}
                />
              </BottomContext>
            ) : (
              <BottomContext variant="empty" />
            )
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
  toastContainer: {
    position: "absolute",
    top: -52,
    left: spacing["400"],
    right: spacing["400"],
    zIndex: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
});
