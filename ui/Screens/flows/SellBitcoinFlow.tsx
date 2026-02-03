import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import BtcSellEnterAmount from "../../Templates/EnterAmount/instances/BtcSellEnterAmount";
import ConfirmSellSlot from "../../Templates/TxConfirmation/instances/ConfirmSellSlot";
import { CurrencyInput, BottomContext } from "../../../components/CurrencyInput";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";

export interface SellBitcoinFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function SellBitcoinFlow({ onComplete, onClose }: SellBitcoinFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["enterAmount"]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

  const formatWithCommas = (num: number, decimals = 2): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  };

  const formatSats = (sats: number): string => {
    const formatted = String(Math.round(sats)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `~${formatted} sats`;
  };

  const handleEnterAmountContinue = (amount: string) => {
    setFlowAmount(amount);
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleConfirmBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowClose = () => {
    setFlowStack([]);
    onClose();
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const feeAmount = numAmount * 0.01;
    const netAmount = numAmount - feeAmount;
    const satsEquivalent = Math.round((numAmount / BTC_PRICE_USD) * 100000000);

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Sell bitcoin"
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
          >
            <BtcSellEnterAmount
              maxBtcAmount="0.07"
              btcPrice={BTC_PRICE_USD}
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Sell bitcoin"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <ConfirmSellSlot
              amount={`$${formatWithCommas(numAmount)}`}
              satsEquivalent={formatSats(satsEquivalent)}
              bitcoinPrice="$100,000.00"
              saleAmount={`$${formatWithCommas(netAmount)}`}
              feePercentage="1%"
              feeAmount={`-$${formatWithCommas(feeAmount)}`}
              actionLabel="Confirm sell"
              onConfirmPress={handleConfirm}
            />
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    const numAmount = parseFloat(flowAmount) || 0;
    const satsEquivalent = Math.round((numAmount / BTC_PRICE_USD) * 100000000);

    return (
      <FullscreenTemplate
        title="Bitcoin sold"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${parseFloat(flowAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            topContextVariant="btc"
            topContextValue={`~${satsEquivalent.toLocaleString()} sats`}
            bottomContextSlot={
              <BottomContext variant="maxButton">
                <Button
                  label="View details"
                  hierarchy="secondary"
                  size="xs"
                  onPress={handleSuccessDone}
                />
              </BottomContext>
            }
          />
        </View>
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button
              label="Done"
              hierarchy="inverse"
              size="md"
              onPress={handleSuccessDone}
            />
          }
        />
      </FullscreenTemplate>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenStack
        stack={flowStack}
        renderScreen={renderScreen}
        onEmpty={handleFlowEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
  successContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
