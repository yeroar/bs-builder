import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import BtcSendEnterAmount from "../../../Templates/EnterAmount/instances/BTC/BtcSendEnterAmount";
import BtcSendConfirmation from "../../../Templates/TxConfirmation/instances/BTC/BtcSendConfirmation";
import BtcSendSuccess from "../../../Templates/Success/instances/BTC/BtcSendSuccess";
import { spacing } from "../../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";

export interface BtcSendFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcSendFlow({ onComplete, onClose }: BtcSendFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["enterAmount"]);
  const [satsAmount, setSatsAmount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatUsdFromSats = (sats: number): string => {
    const usd = (sats / 100000000) * BTC_PRICE_USD;
    if (usd < 0.01) return "< $0.01";
    return `~$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleEnterAmountContinue = (sats: number) => {
    setSatsAmount(sats);
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
    const feeSats = Math.round(satsAmount * 0.001);
    const usdEquivalent = formatUsdFromSats(satsAmount);
    const feeUsd = formatUsdFromSats(feeSats);

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Send bitcoin"
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
          >
            <BtcSendEnterAmount
              maxSats={7000000}
              btcPriceUsd={BTC_PRICE_USD}
              onContinue={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Send bitcoin"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcSendConfirmation
              satsAmount={satsAmount}
              usdEquivalent={usdEquivalent}
              bitcoinAddress="3NC53Da...9wff5iY"
              feeSats={feeSats}
              feeUsd={feeUsd}
              estimatedTime="Arrives within 24hrs"
              onConfirmPress={handleConfirm}
            />
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <FullscreenTemplate
        title="Send initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <BtcSendSuccess
          satsAmount={satsAmount}
          usdEquivalent={formatUsdFromSats(satsAmount)}
          onDone={handleSuccessDone}
          onViewDetails={handleSuccessDone}
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
});
