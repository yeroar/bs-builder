import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import RecurringDepositEnterAmount from "../../../Slots/Cash/RecurringDepositEnterAmount";
import RecurringDepositConfirmation from "../../../Slots/Cash/RecurringDepositConfirmation";
import RecurringDepositDetailsSlot from "../../../Slots/Cash/RecurringDepositDetailsSlot";
import RecurringDepositSuccess from "../../../Slots/Cash/RecurringDepositSuccess";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import Divider from "../../../../components/Primitives/Divider/Divider";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { spacing } from "../../../../components/tokens";
import { formatWithCommas } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm" | "details";

export interface RecurringDepositFlowProps {
  /** "create" opens bank modal to schedule new; "manage" opens detail view */
  mode?: "create" | "manage";
  frequency?: string;
  /** Amount for manage mode */
  amount?: string;
  /** Initial paused state for manage mode */
  initialPaused?: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function RecurringDepositFlow({
  mode = "create",
  frequency = "Weekly",
  amount = "100",
  initialPaused = false,
  onComplete,
  onClose
}: RecurringDepositFlowProps) {
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(mode === "create");

  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>(mode === "manage" ? ["details"] : []);
  const [flowAmount, setFlowAmount] = useState(mode === "manage" ? amount : "0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [depositPaused, setDepositPaused] = useState(initialPaused);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

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

  // Detail screen handlers
  const handleTogglePause = () => {
    setDepositPaused(prev => !prev);
  };

  const handleRemoveDeposit = () => {
    setFlowStack([]);
    onComplete();
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
            <RecurringDepositConfirmation
              amount={`$${formatWithCommas(numAmount)}`}
              frequency={frequency}
              startingDate={getStartingDate()}
              frequencyLabel={`${frequency} on ${getDayOfWeek()}`}
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodBrand={selectedBrand}
              paymentMethodLabel={selectedLabel}
              onPaymentMethodPress={() => setIsModalVisible(true)}
              onConfirmPress={handleConfirm}
            />
          </FullscreenTemplate>
        );
      case "details": {
        const detailAmount = parseFloat(flowAmount) || 100;
        return (
          <FullscreenTemplate
            title="Scheduled deposit"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="start"
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label={depositPaused ? "Resume" : "Pause"}
                    hierarchy="primary"
                    size="md"
                    onPress={handleTogglePause}
                  />
                }
                secondaryButton={
                  <Button
                    label="Remove"
                    hierarchy="tertiary"
                    size="md"
                    onPress={handleRemoveDeposit}
                  />
                }
              />
            }
          >
            <View style={styles.detailContent}>
              <CurrencyInput
                value={`$${detailAmount.toFixed(0)}`}
                topContextSlot={<TopContext variant="frequency" value={frequency} />}
                bottomContextSlot={<BottomContext variant="empty" />}
              />
              <View style={styles.detailReceipt}>
                <Divider />
                <RecurringDepositDetailsSlot
                  state={depositPaused ? "paused" : "active"}
                  frequency={`${frequency} on ${getDayOfWeek()}`}
                  started={getStartingDate()}
                  bankLabel={selectedLabel || "bankAccount 1234"}
                  onBankPress={() => setIsModalVisible(true)}
                />
              </View>
            </View>
          </FullscreenTemplate>
        );
      }
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
        <RecurringDepositSuccess
          amount={`$${formatWithCommas(numAmount)}`}
          frequency={frequency}
          onDone={handleSuccessDone}
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
  detailContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
  detailReceipt: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
  },
});
