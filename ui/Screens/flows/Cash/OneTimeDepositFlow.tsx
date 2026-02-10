import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import OneTimeDepositEnterAmount from "../../../Slots/Cash/OneTimeDepositEnterAmount";
import OneTimeDepositConfirmation from "../../../Slots/Cash/OneTimeDepositConfirmation";
import OneTimeDepositSuccess from "../../../Slots/Cash/OneTimeDepositSuccess";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { formatWithCommas } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm";

export interface OneTimeDepositFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function OneTimeDepositFlow({ onComplete, onClose }: OneTimeDepositFlowProps) {
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

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="One-time deposit"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <OneTimeDepositEnterAmount
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="One-time deposit"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
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
            <OneTimeDepositConfirmation
              amount={`$${formatWithCommas(numAmount)}`}
              transferAmount={`$${formatWithCommas(numAmount)}`}
              totalAmount={`$${formatWithCommas(numAmount)}`}
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
        <OneTimeDepositSuccess
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
        type="bankAccount"
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
