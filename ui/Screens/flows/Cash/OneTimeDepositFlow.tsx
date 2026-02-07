import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import OneTimeDepositEnterAmount from "../../../Slots/Cash/OneTimeDepositEnterAmount";
import OneTimeDepositConfirmation from "../../../Slots/Cash/OneTimeDepositConfirmation";
import { CurrencyInput } from "../../../../components/Inputs/CurrencyInput";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ChooseBankAccountSlot from "../../../Slots/Shared/PaymentMethods/ChooseBankAccountSlot";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { spacing } from "../../../../components/tokens";
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
  const [tempSelectedBankId, setTempSelectedBankId] = useState<string | undefined>();
  const [tempSelectedBankBrand, setTempSelectedBankBrand] = useState<string | undefined>();
  const [tempSelectedBankLabel, setTempSelectedBankLabel] = useState<string | undefined>();

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleConfirmBankSelection = () => {
    if (tempSelectedBankId) {
      setSelectedPaymentMethod("bankAccount");
      setSelectedBrand(tempSelectedBankBrand);
      setSelectedLabel(tempSelectedBankLabel);
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
          >
            <OneTimeDepositConfirmation
              amount={`$${formatWithCommas(numAmount)}`}
              transferAmount={`$${formatWithCommas(numAmount)}`}
              totalAmount={`$${formatWithCommas(numAmount)}`}
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
            bottomContextVariant="empty"
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
                  disabled={!tempSelectedBankId}
                  onPress={handleConfirmBankSelection}
                />
              }
            />
          }
        >
          <ChooseBankAccountSlot
            selectedAccountId={tempSelectedBankId}
            onSelectAccount={(account) => {
              setTempSelectedBankId(account.id);
              setTempSelectedBankBrand(account.brand);
              setTempSelectedBankLabel(`${account.name} •••• ${account.lastFour}`);
            }}
            onAddBankAccount={handleCloseModal}
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
