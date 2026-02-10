import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import RemoveConfirmModal from "../../../Slots/Modals/RemoveConfirmModal";
import { CalendarIcon } from "../../../../components/Icons/CalendarIcon";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import RecurringDepositEnterAmount from "../../../Slots/Cash/RecurringDepositEnterAmount";
import RecurringDepositConfirmation from "../../../Slots/Cash/RecurringDepositConfirmation";
import RecurringDepositDetails from "../../../Slots/Cash/RecurringDepositDetails";
import RecurringDeposit, { ScheduledDeposit } from "../../../Slots/Cash/RecurringDeposit";
import FrequencySelector from "../../../Slots/Shared/FrequencySelector";
import RecurringDepositSuccess from "../../../Slots/Cash/RecurringDepositSuccess";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import Divider from "../../../../components/Primitives/Divider/Divider";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { spacing } from "../../../../components/tokens";
import { formatWithCommas } from "../../../../components/utils/formatWithCommas";

import { FoldText } from "../../../../components/Primitives/FoldText";
import { colorMaps } from "../../../../components/tokens";

type FlowStep = "intro" | "selectFrequency" | "enterAmount" | "confirm" | "details";

const frequencyOptions = [
  { label: "Weekly", value: "Weekly" },
  { label: "Every two weeks", value: "Every two weeks" },
  { label: "Monthly", value: "Monthly" },
];

export interface RecurringDepositFlowProps {
  /** "create" starts empty; "manage" shows existing deposits */
  mode?: "create" | "manage";
  frequency?: string;
  /** Initial deposits for manage mode */
  initialDeposits?: ScheduledDeposit[];
  /** Start directly on details screen for a specific deposit */
  startAtDetails?: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export default function RecurringDepositFlow({
  mode = "create",
  frequency: initialFrequency = "Weekly",
  initialDeposits,
  startAtDetails = false,
  onComplete,
  onClose
}: RecurringDepositFlowProps) {
  // Frequency state
  const [frequency, setFrequency] = useState(initialFrequency);

  // Deposits list state
  const [deposits, setDeposits] = useState<ScheduledDeposit[]>(
    initialDeposits ?? (mode === "manage"
      ? [{ title: "Weekly deposit", secondaryText: "$100 every week" }]
      : [])
  );
  const [selectedDepositIndex, setSelectedDepositIndex] = useState(0);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>(
    startAtDetails ? ["intro", "details"] : ["intro"]
  );
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [depositPaused, setDepositPaused] = useState(false);

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
  };

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
  };

  // Intro handlers
  const handleSchedulePress = () => {
    setFlowStack(prev => [...prev, "selectFrequency"]);
  };

  const handleDepositPress = (index: number) => {
    setSelectedDepositIndex(index);
    setDepositPaused(deposits[index]?.status === "paused");
    setFlowStack(prev => [...prev, "details"]);
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
    // Add the new deposit to the list
    const numAmount = parseFloat(flowAmount) || 0;
    setDeposits(prev => [...prev, {
      title: `${frequency} deposit`,
      secondaryText: `$${formatWithCommas(numAmount)} every week`,
    }]);
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

  // Remove confirmation
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Detail screen handlers
  const handleTogglePause = () => {
    setDepositPaused(prev => {
      const newPaused = !prev;
      setDeposits(d => d.map((dep, i) =>
        i === selectedDepositIndex ? { ...dep, status: newPaused ? "paused" : "active" } : dep
      ));
      return newPaused;
    });
  };

  const handleRemovePress = () => {
    setShowRemoveModal(true);
  };

  const handleConfirmRemove = () => {
    setShowRemoveModal(false);
    setDeposits(prev => prev.filter((_, i) => i !== selectedDepositIndex));
    // Pop back to intro
    setFlowStack(prev => prev.filter(s => s !== "details"));
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;

    switch (step) {
      case "intro":
        return (
          <FullscreenTemplate
            title="Recurring deposit"
            onLeftPress={() => setFlowStack([])}
            navVariant="start"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    Deposits start on your chosen date and are usually available within 2 business days.
                  </FoldText>
                }
                primaryButton={
                  <Button
                    label="Schedule a recurring deposit"
                    hierarchy="primary"
                    size="md"
                    onPress={handleSchedulePress}
                  />
                }
              />
            }
          >
            <RecurringDeposit
              hasActive={deposits.length > 0}
              onSchedulePress={handleSchedulePress}
              scheduledDeposits={deposits.map((dep, i) => ({
                ...dep,
                onPress: () => handleDepositPress(i),
              }))}
            />
          </FullscreenTemplate>
        );
      case "selectFrequency":
        return (
          <FullscreenTemplate
            title="Recurring deposit"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="start"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Continue"
                    hierarchy="primary"
                    size="md"
                    onPress={() => setFlowStack(prev => [...prev, "enterAmount"])}
                  />
                }
              />
            }
          >
            <FrequencySelector
              options={frequencyOptions}
              selectedValue={frequency}
              onSelect={setFrequency}
            />
          </FullscreenTemplate>
        );
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Recurring deposit"
            onLeftPress={handleConfirmBack}
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
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Confirm recurring deposit"
                    hierarchy="primary"
                    size="md"
                    disabled={selectedPaymentMethod === "null"}
                    onPress={handleConfirm}
                  />
                }
              />
            }
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
            />
          </FullscreenTemplate>
        );
      case "details": {
        const deposit = deposits[selectedDepositIndex];
        const detailAmount = 100;
        return (
          <FullscreenTemplate
            title="Scheduled deposit"
            onLeftPress={() => setFlowStack(prev => prev.filter(s => s !== "details"))}
            scrollable={false}
            navVariant="step"
            disableAnimation
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
                    onPress={handleRemovePress}
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
                <RecurringDepositDetails
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
        <RecurringDepositSuccess
          amount={`$${formatWithCommas(numAmount)}`}
          frequency={frequency}
          onViewDetails={handleSuccessDone}
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

      <RemoveConfirmModal
        visible={showRemoveModal}
        icon={<CalendarIcon />}
        title="Remove recurring deposits"
        body="Recurring transfers will no longer be made."
        onRemove={handleConfirmRemove}
        onDismiss={() => setShowRemoveModal(false)}
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
