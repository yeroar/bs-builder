import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import InstantDepositEnterAmount from "../../../Slots/Cash/InstantDepositEnterAmount";
import InstantDepositConfirmation from "../../../Slots/Cash/InstantDepositConfirmation";
import InstantDepositSuccess from "../../../Slots/Cash/InstantDepositSuccess";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { colorMaps } from "../../../../components/tokens";
import { formatWithCommas } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm";

export interface InstantDepositFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function InstantDepositFlow({ onComplete, onClose }: InstantDepositFlowProps) {
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>([]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setFlowStack(["enterAmount"]);
  };

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

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const feeRate = 0.015; // 1.5%
    const feeAmount = numAmount * feeRate;
    const totalAmount = numAmount + feeAmount;

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Instant deposit"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <InstantDepositEnterAmount
              maxAmount="$500.00"
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Instant deposit"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    Transfers time vary by bank. All transfers are subject to review and could be delayed or stopped at our discretion.
                  </FoldText>
                }
                primaryButton={
                  <Button
                    label="Confirm deposit"
                    hierarchy="primary"
                    size="md"
                    disabled={selectedPaymentMethod === "null"}
                    onPress={handleConfirm}
                  />
                }
              />
            }
          >
            <InstantDepositConfirmation
              amount={`$${formatWithCommas(numAmount)}`}
              transferAmount={`$${formatWithCommas(numAmount)}`}
              feePercentage="1.5%"
              feeAmount={`+ $${formatWithCommas(feeAmount)}`}
              totalAmount={`$${formatWithCommas(totalAmount)}`}
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodBrand={selectedBrand}
              paymentMethodLabel={selectedLabel}
              onPaymentMethodPress={() => setIsModalVisible(true)}
            />
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  // Success screen
  if (showSuccess) {
    const numAmount = parseFloat(flowAmount) || 0;

    return (
      <FullscreenTemplate
        title="Deposit initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
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
        }
      >
        <InstantDepositSuccess
          amount={`$${formatWithCommas(numAmount)}`}
        />
      </FullscreenTemplate>
    );
  }

  return (
    <>
      {/* Flow screens */}
      {flowStack.length > 0 && (
        <View style={styles.container}>
          <ScreenStack
            stack={flowStack}
            renderScreen={renderScreen}
            animateInitial
            onEmpty={handleFlowEmpty}
          />
        </View>
      )}

      <ChoosePaymentMethodModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelect={handlePaymentMethodSelect}
        type="debitCard"
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
});
