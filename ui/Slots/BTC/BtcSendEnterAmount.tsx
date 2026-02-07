import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import EnterAmount from "../../Templates/EnterAmount/EnterAmount";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../components/Keypad";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";
import { formatSatsInput } from "../../../components/utils/formatWithCommas";

export interface BtcSendEnterAmountProps {
  maxSats?: number;
  btcPriceUsd?: number;
  onContinue?: (sats: number) => void;
  onClose?: () => void;
  testID?: string;
}

export default function BtcSendEnterAmount({
  maxSats = 7000000, // 0.07 BTC in sats
  btcPriceUsd = 102500, // $102,500 per BTC
  onContinue,
  onClose,
  testID,
}: BtcSendEnterAmountProps) {
  const [satsAmount, setSatsAmount] = useState("");

  const satsToUsd = useCallback((sats: number): number => {
    return (sats / 100000000) * btcPriceUsd;
  }, [btcPriceUsd]);

  const formatUsdEquivalent = (sats: number): string => {
    if (sats === 0) return "";
    const usd = satsToUsd(sats);
    if (usd < 0.01) return "< $0.01";
    return `~$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMaxBtc = (): string => {
    const btc = maxSats / 100000000;
    // Remove trailing zeros
    const formatted = btc.toFixed(8).replace(/\.?0+$/, "");
    return `Max ฿${formatted}`;
  };

  const handleNumberPress = (num: string) => {
    if (num === ".") return; // No decimals for sats
    const newValue = satsAmount + num;
    const numericValue = parseInt(newValue, 10);
    if (numericValue <= maxSats) {
      setSatsAmount(newValue);
    }
  };

  const handleBackspacePress = () => {
    setSatsAmount(prev => prev.slice(0, -1));
  };

  const handleMaxPress = () => {
    setSatsAmount(maxSats.toString());
  };

  const handleContinue = () => {
    const sats = parseInt(satsAmount, 10) || 0;
    if (sats > 0) {
      onContinue?.(sats);
    }
  };

  const currentSats = parseInt(satsAmount, 10) || 0;
  const usdEquivalent = formatUsdEquivalent(currentSats);
  const canContinue = currentSats > 0;

  return (
    <EnterAmount>
      <View style={styles.content} testID={testID}>
        <CurrencyInput
          value={formatSatsInput(satsAmount)}
          topContextSlot={
            usdEquivalent ? (
              <TopContext variant="btc" value={usdEquivalent} />
            ) : (
              <TopContext variant="empty" value="" />
            )
          }
          bottomContextSlot={
            <BottomContext variant="maxButton">
              <Button
                label={formatMaxBtc()}
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
        onBackspacePress={handleBackspacePress}
        disableDecimal
      >
        <Button
          label="Continue"
          hierarchy="primary"
          size="md"
          disabled={!canContinue}
          onPress={handleContinue}
        />
      </Keypad>
    </EnterAmount>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
});
