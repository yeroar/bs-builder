import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import IntroTemplate from "../../../Templates/IntroTemplate";
import BtcAutoStackEnterAmount from "../../../Slots/BTC/BtcAutoStackEnterAmount";
import BtcAutoStackConfirmation from "../../../Slots/BTC/BtcAutoStackConfirmation";
import { Frequency, AutoStackConfig } from "../../../Slots/BTC/BtcSlot";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import RemoveModalSlot from "../../../Slots/Modals/RemoveModalSlot";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../components/Primitives/IconContainer/IconContainer";
import FrequencyAutoStackSlot from "../../../Slots/BTC/FrequencyAutoStackSlot";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../components/Primitives/Divider/Divider";
import AutomationSuccess from "../../../Templates/Success/AutomationSuccess";
import { CalendarIcon } from "../../../../components/Icons/CalendarIcon";
import { SettingsIcon } from "../../../../components/Icons/SettingsIcon";
import { RocketIcon } from "../../../../components/Icons/RocketIcon";
import { ClockIcon } from "../../../../components/Icons/ClockIcon";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../../components/tokens";

type FlowStep = "intro" | "selectFrequency" | "enterAmount" | "confirm" | "details";

export interface BtcAutoStackFlowProps {
  /** If true, show details view with Turn off button */
  isFeatureActive?: boolean;
  /** Initial config when feature is active */
  initialConfig?: AutoStackConfig;
  /** Called with config when flow completes */
  onComplete: (config: AutoStackConfig) => void;
  onClose: () => void;
  /** Called when user taps "Turn off" */
  onTurnOff?: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcAutoStackFlow({
  isFeatureActive = false,
  initialConfig,
  onComplete,
  onClose,
  onTurnOff,
}: BtcAutoStackFlowProps) {
  // If feature is active, show details view; otherwise show intro
  const initialStep: FlowStep = isFeatureActive ? "details" : "intro";
  const [flowStack, setFlowStack] = useState<FlowStep[]>([initialStep]);

  // Track if intro was shown to determine navVariant for subsequent screens
  const showedIntro = !isFeatureActive;
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>(
    initialConfig?.frequency || "Daily"
  );
  const [flowAmount, setFlowAmount] = useState(initialConfig?.amount || "0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTurnOffModal, setShowTurnOffModal] = useState(false);
  const successRef = useRef<FullscreenTemplateRef>(null);

  const handleIntroContinue = () => {
    setFlowStack(prev => [...prev, "selectFrequency"]);
  };

  const handleSelectFrequencyContinue = () => {
    setFlowStack(prev => [...prev, "enterAmount"]);
  };

  const handleEnterAmountContinue = (amount: string) => {
    setFlowAmount(amount);
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleBack = () => {
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
    successRef.current?.close();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onComplete({ amount: flowAmount, frequency: selectedFrequency });
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const satsAmount = Math.round((numAmount / BTC_PRICE_USD) * 100000000);
    const usdEquivalent = `~$${numAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    switch (step) {
      case "intro":
        return (
          <FullscreenTemplate
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Continue"
                    hierarchy="primary"
                    size="md"
                    onPress={handleIntroContinue}
                  />
                }
              />
            }
          >
            <IntroTemplate
              header="Auto stack"
              body="Set your savings on autopilot. Schedule daily, weekly, or bi-weekly bitcoin buys that fit your life."
            >
              <ListItem
                variant="feature"
                title="Pick the schedule"
                secondaryText="Choose how often you buy—then sit back and relax."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<CalendarIcon />} />}
              />
              <ListItem
                variant="feature"
                title="Set how much"
                secondaryText="Start with as little as $10."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<SettingsIcon />} />}
              />
              <ListItem
                variant="feature"
                title="No fees for Fold+"
                secondaryText="Fold+ members stack with zero fees."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RocketIcon />} />}
              />
            </IntroTemplate>
          </FullscreenTemplate>
        );
      case "selectFrequency":
        return (
          <FullscreenTemplate
            title="Auto stack bitcoin"
            onLeftPress={showedIntro ? handleBack : handleFlowClose}
            scrollable={false}
            navVariant={showedIntro ? "step" : "start"}
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Continue"
                    hierarchy="primary"
                    size="md"
                    onPress={handleSelectFrequencyContinue}
                  />
                }
              />
            }
          >
            <FrequencyAutoStackSlot
              selectedFrequency={selectedFrequency}
              onFrequencySelect={setSelectedFrequency}
            />
          </FullscreenTemplate>
        );
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Auto stack bitcoin"
            onLeftPress={handleBack}
            scrollable={false}
            navVariant="step"
          >
            <BtcAutoStackEnterAmount
              frequency={selectedFrequency}
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Auto stack bitcoin"
            onLeftPress={handleBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcAutoStackConfirmation
              satsAmount={satsAmount}
              usdEquivalent={usdEquivalent}
              totalPurchase={`$${numAmount.toFixed(2)}`}
              totalPurchaseSats={`${satsAmount.toLocaleString()} sats`}
              totalCost={`$${numAmount.toFixed(2)}`}
              onConfirmPress={handleConfirm}
            />
          </FullscreenTemplate>
        );
      case "details":
        const detailsAmount = parseFloat(flowAmount) || 100;
        return (
          <FullscreenTemplate
            title="Auto stack"
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Turn off Auto stack"
                    hierarchy="tertiary"
                    size="md"
                    onPress={() => setShowTurnOffModal(true)}
                  />
                }
              />
            }
          >
            <View style={styles.detailsContent}>
              <CurrencyInput
                value={`$${detailsAmount.toFixed(0)}`}
                topContextSlot={<TopContext variant="frequency" value={selectedFrequency} />}
                bottomContextSlot={<BottomContext variant="empty" />}
              />
              <View style={styles.detailsReceipt}>
                <Divider />
                <ReceiptDetails>
                  <ListItemReceipt label="Next purchase" value="$50.00" />
                  <ListItemReceipt label="Purchase amount" value="+ $1.50" />
                  <ListItemReceipt label="Fees • 0%" value="Market price" />
                  <ListItemReceipt label="Total cost" value={`$${detailsAmount.toFixed(2)}`} />
                </ReceiptDetails>
              </View>
            </View>
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
        ref={successRef}
        title="Auto stack initiated"
        leftIcon="x"
        onLeftPress={handleSuccessClose}
        scrollable={false}
        variant="yellow"
        navVariant="start"
        enterAnimation="fill"
        footer={
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
            secondaryButton={
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
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${numAmount.toFixed(0)}`}
            topContextSlot={<TopContext variant="frequency" value={selectedFrequency} />}
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
      </FullscreenTemplate>
    );
  }

  const frequencyText = selectedFrequency.toLowerCase();

  return (
    <View style={styles.container}>
      <ScreenStack
        stack={flowStack}
        renderScreen={renderScreen}
        onEmpty={handleFlowEmpty}
      />

      {/* Turn Off Confirmation Modal */}
      <Modal
        visible={showTurnOffModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowTurnOffModal(false)}
      >
        <MiniModal
          variant="destructive"
          showHeader={false}
          onClose={() => setShowTurnOffModal(false)}
          footer={
            <ModalFooter
              type="dualButton"
              primaryButton={
                <Button
                  label="Turn off"
                  hierarchy="destructive"
                  size="md"
                  onPress={() => {
                    setShowTurnOffModal(false);
                    onTurnOff?.();
                  }}
                />
              }
              secondaryButton={
                <Button
                  label="Dismiss"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => setShowTurnOffModal(false)}
                />
              }
            />
          }
        >
          <RemoveModalSlot
            icon={<ClockIcon />}
            title="Turn off Auto stack"
            body={`Your ${frequencyText} bitcoin buys will stop.`}
          />
        </MiniModal>
      </Modal>
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
  detailsContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
  detailsReceipt: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
  },
});
