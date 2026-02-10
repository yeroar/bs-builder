import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import BtcSellEnterAmount from "../../../Slots/BTC/BtcSellEnterAmount";
import BtcSellConfirmation from "../../../Slots/BTC/BtcSellConfirmation";
import BtcSellSuccess from "../../../Slots/BTC/BtcSellSuccess";
import { formatWithCommas, formatSats } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm";

export interface BtcSellFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcSellFlow({ onComplete, onClose }: BtcSellFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["enterAmount"]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

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
            <BtcSellConfirmation
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
      <BtcSellSuccess
        amount={`$${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        satsEquivalent={formatSats(satsEquivalent)}
        enterAnimation="fill"
        onClose={handleSuccessDone}
      />
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
});
