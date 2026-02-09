import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import BtcBuyEnterAmount from "../../../Slots/BTC/BtcBuyEnterAmount";
import BtcBuyConfirmation from "../../../Slots/BTC/BtcBuyConfirmation";
import { CurrencyInput } from "../../../../components/Inputs/CurrencyInput";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../../../components/tokens";
import { formatWithCommas, formatSats } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm";

export interface BtcBuyFlowProps {
  /** Initial amount if pre-selected (e.g., "$50") */
  initialAmount?: string;
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcBuyFlow({ initialAmount, onComplete, onClose }: BtcBuyFlowProps) {
  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>(() => {
    // If initial amount provided, skip to confirm
    if (initialAmount && initialAmount !== "custom") {
      return ["confirm"];
    }
    return ["enterAmount"];
  });
  const [flowAmount, setFlowAmount] = useState(() => {
    if (initialAmount && initialAmount !== "custom") {
      return initialAmount.replace("$", "");
    }
    return "0";
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  // Flow handlers
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

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  // Payment method modal handlers
  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setIsPaymentModalVisible(false);
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const feeAmount = numAmount * 0.01;
    const netAmount = numAmount - feeAmount;
    const satsEquivalent = Math.round(numAmount * 100);

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Buy bitcoin"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcBuyEnterAmount
              maxAmount="$500.00"
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Confirm purchase"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcBuyConfirmation
              amount={`$${formatWithCommas(numAmount)}`}
              satsEquivalent={formatSats(satsEquivalent)}
              bitcoinPrice="$100,000.00"
              purchaseAmount={`$${formatWithCommas(netAmount)}`}
              feePercentage="1%"
              feeAmount={`+$${formatWithCommas(feeAmount)}`}
              actionLabel="Confirm purchase"
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodBrand={selectedBrand}
              onPaymentMethodPress={() => setIsPaymentModalVisible(true)}
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
    const satsEquivalent = Math.round(numAmount * 100);

    return (
      <FullscreenTemplate
        title="Purchase submitted"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${parseFloat(flowAmount).toFixed(2)}`}
            topContextVariant="btc"
            topContextValue={formatSats(satsEquivalent)}
            bottomContextVariant="none"
          />
        </View>
        <ModalFooter
          type="inverse"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
              <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
                up to 14 days
              </FoldText>
              {" "}from purchase to unlock.
            </FoldText>
          }
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
    <>
      <View style={styles.container}>
        <ScreenStack
          stack={flowStack}
          renderScreen={renderScreen}
          animateInitial
          onEmpty={handleFlowEmpty}
        />
      </View>

      <ChoosePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onSelect={handlePaymentMethodSelect}
        type="multiStep"
      />
    </>
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
