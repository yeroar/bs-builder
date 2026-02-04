import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import InstantDepositEnterAmount from "../../Templates/EnterAmount/instances/Cash/InstantDepositEnterAmount";
import ConfirmInstantDepositSlot from "../../Templates/TxConfirmation/instances/Cash/ConfirmInstantDepositSlot";
import { CurrencyInput } from "../../../components/CurrencyInput";
import MiniModal from "../../../components/modals/MiniModal";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import ChooseDebitCardSlot from "../../Slots/BTC/patterns/PaymentMethods/ChooseDebitCardSlot";
import { PmSelectorVariant } from "../../../components/CurrencyInput/PmSelector";
import { spacing } from "../../../components/tokens";

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
  const [tempSelectedCardId, setTempSelectedCardId] = useState<string | undefined>();
  const [tempSelectedCardBrand, setTempSelectedCardBrand] = useState<string | undefined>();
  const [tempSelectedCardLabel, setTempSelectedCardLabel] = useState<string | undefined>();

  const formatWithCommas = (num: number, decimals = 2): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  };

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleConfirmCardSelection = () => {
    if (tempSelectedCardId) {
      setSelectedPaymentMethod("cardAccount");
      setSelectedBrand(tempSelectedCardBrand);
      setSelectedLabel(tempSelectedCardLabel);
      setIsModalVisible(false);
      setFlowStack(["enterAmount"]);
    }
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

  // Re-open payment method modal
  const handleOpenPaymentModal = () => {
    setIsModalVisible(true);
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
          >
            <ConfirmInstantDepositSlot
              amount={`$${formatWithCommas(numAmount)}`}
              transferAmount={`$${formatWithCommas(numAmount)}`}
              feePercentage="1.5%"
              feeAmount={`+ $${formatWithCommas(feeAmount)}`}
              totalAmount={`$${formatWithCommas(totalAmount)}`}
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodBrand={selectedBrand}
              paymentMethodLabel={selectedLabel}
              onPaymentMethodPress={handleOpenPaymentModal}
              onConfirmPress={handleConfirm}
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
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${formatWithCommas(numAmount)}`}
            topContextVariant="empty"
            bottomContextVariant="paymentMethod"
            paymentMethodVariant={selectedPaymentMethod}
            paymentMethodBrand={selectedBrand}
            paymentMethodLabel={selectedLabel}
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

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <MiniModal
          variant="default"
          onClose={handleCloseModal}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Continue"
                  hierarchy="primary"
                  size="md"
                  disabled={!tempSelectedCardId}
                  onPress={handleConfirmCardSelection}
                />
              }
            />
          }
        >
          <ChooseDebitCardSlot
            selectedCardId={tempSelectedCardId}
            onSelectCard={(card) => {
              setTempSelectedCardId(card.id);
              setTempSelectedCardBrand(card.brand);
              setTempSelectedCardLabel(`${card.name} •••• ${card.lastFour}`);
            }}
            onAddDebitCard={handleCloseModal}
          />
        </MiniModal>
      </Modal>
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
