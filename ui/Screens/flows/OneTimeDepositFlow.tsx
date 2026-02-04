import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import OneTimeDepositEnterAmount from "../../Templates/EnterAmount/instances/OneTimeDepositEnterAmount";
import ConfirmOneTimeDepositSlot from "../../Templates/TxConfirmation/instances/ConfirmOneTimeDepositSlot";
import { CurrencyInput } from "../../../components/CurrencyInput";
import MiniModal from "../../../components/modals/MiniModal";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import OneTimeDepositSlot from "../../Slots/Cash/OneTimeDepositSlot";
import ChooseBankAccountSlot from "../../Slots/BTC/patterns/Payment Methods/ChooseBankAccountSlot";
import ChooseDebitCardSlot from "../../Slots/BTC/patterns/Payment Methods/ChooseDebitCardSlot";
import { PmSelectorVariant } from "../../../components/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";
type ModalStep = "depositOptions" | "chooseBankAccount" | "chooseDebitCard";

export interface OneTimeDepositFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function OneTimeDepositFlow({ onComplete, onClose }: OneTimeDepositFlowProps) {
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [modalStep, setModalStep] = useState<ModalStep>("depositOptions");

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

  const handleInstantPress = () => {
    setModalStep("chooseDebitCard");
  };

  const handleOneTimePress = () => {
    setModalStep("chooseBankAccount");
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
    if (selectedPaymentMethod === "bankAccount") {
      setModalStep("chooseBankAccount");
    } else {
      setModalStep("chooseDebitCard");
    }
    setIsModalVisible(true);
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case "chooseBankAccount":
        return (
          <ChooseBankAccountSlot
            selectedAccountId={tempSelectedBankId}
            onSelectAccount={(account) => {
              setTempSelectedBankId(account.id);
              setTempSelectedBankBrand(account.brand);
              setTempSelectedBankLabel(`${account.name} •••• ${account.lastFour}`);
            }}
            onAddBankAccount={handleCloseModal}
          />
        );
      case "chooseDebitCard":
        return (
          <ChooseDebitCardSlot
            selectedCardId={tempSelectedCardId}
            onSelectCard={(card) => {
              setTempSelectedCardId(card.id);
              setTempSelectedCardBrand(card.brand);
              setTempSelectedCardLabel(`${card.name} •••• ${card.lastFour}`);
            }}
            onAddDebitCard={handleCloseModal}
          />
        );
      default:
        return (
          <OneTimeDepositSlot
            onInstantPress={handleInstantPress}
            onOneTimePress={handleOneTimePress}
            onRecurringPress={handleCloseModal}
          />
        );
    }
  };

  const renderModalFooter = () => {
    if (modalStep === "chooseBankAccount") {
      return (
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
      );
    }
    if (modalStep === "chooseDebitCard") {
      return (
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
      );
    }
    return (
      <ModalFooter
        type="default"
        disclaimer={
          <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
            The Fold Card is issued by Sutton Bank, Member FDIC, pursuant to a...{" "}
            <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>
              View more
            </FoldText>
          </FoldText>
        }
      />
    );
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
            <ConfirmOneTimeDepositSlot
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
          footer={renderModalFooter()}
        >
          {renderModalContent()}
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
