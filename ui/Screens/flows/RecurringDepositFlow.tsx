import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import RecurringDepositEnterAmount from "../../Templates/EnterAmount/instances/RecurringDepositEnterAmount";
import ConfirmRecurringDepositSlot from "../../Templates/TxConfirmation/instances/ConfirmRecurringDepositSlot";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/CurrencyInput";
import MiniModal from "../../../components/modals/MiniModal";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import ChooseBankAccountSlot from "../../Slots/BTC/patterns/Payment Methods/ChooseBankAccountSlot";
import { PmSelectorVariant } from "../../../components/CurrencyInput/PmSelector";
import { spacing } from "../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";

export interface RecurringDepositFlowProps {
  frequency?: string;
  onComplete: () => void;
  onClose: () => void;
}

export default function RecurringDepositFlow({
  frequency = "Weekly",
  onComplete,
  onClose
}: RecurringDepositFlowProps) {
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

  const formatWithCommas = (num: number, decimals = 2): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  };

  // Get day of week for frequency label
  const getDayOfWeek = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const getStartingDate = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const day = getDayOfWeek();
    const month = now.toLocaleString("en-US", { month: "short" });
    const date = now.getDate();
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm} ${day}, ${month} ${date}`;
  };

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
            title="Recurring deposit"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <RecurringDepositEnterAmount
              frequency={frequency}
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Recurring deposit"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <ConfirmRecurringDepositSlot
              amount={`$${formatWithCommas(numAmount)}`}
              frequency={frequency}
              startingDate={getStartingDate()}
              frequencyLabel={`${frequency} on ${getDayOfWeek()}`}
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
        title="Recurring deposit initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${formatWithCommas(numAmount)}`}
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
