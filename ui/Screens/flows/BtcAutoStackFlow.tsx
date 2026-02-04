import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import BtcAutoStackEnterAmount from "../../Templates/EnterAmount/instances/BTC/BtcAutoStackEnterAmount";
import BtcAutoStackConfirmationSlot from "../../Templates/TxConfirmation/instances/BTC/BtcAutoStackConfirmationSlot";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/CurrencyInput";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";

export interface BtcAutoStackFlowProps {
  frequency?: string;
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcAutoStackFlow({ frequency = "Daily", onComplete, onClose }: BtcAutoStackFlowProps) {
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
    const satsAmount = Math.round((numAmount / BTC_PRICE_USD) * 100000000);
    const usdEquivalent = `~$${numAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Auto stack bitcoin"
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
          >
            <BtcAutoStackEnterAmount
              frequency={frequency}
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Auto stack bitcoin"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcAutoStackConfirmationSlot
              satsAmount={satsAmount}
              usdEquivalent={usdEquivalent}
              totalPurchase={`$${numAmount.toFixed(2)}`}
              totalPurchaseSats={`${satsAmount.toLocaleString()} sats`}
              totalCost={`$${numAmount.toFixed(2)}`}
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

    return (
      <FullscreenTemplate
        title="Auto stack initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${numAmount.toFixed(2)}`}
            topContextSlot={<TopContext variant="frequency" value={frequency} />}
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
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Bitcoin purchases usually settle within a few minutes, but may take up to{" "}
              <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
                1 business day
              </FoldText>
              . We will notify you once the transaction is complete and available for withdrawal
            </FoldText>
          }
          primaryButton={
            <Button
              label="Redeem"
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
