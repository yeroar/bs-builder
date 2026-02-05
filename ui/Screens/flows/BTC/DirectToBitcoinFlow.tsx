import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import IntroTemplate from "../../../Templates/IntroTemplate";
import EnterAmount from "../../../Templates/EnterAmount/EnterAmount";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import RemoveModalSlot from "../../../Slots/Modals/RemoveModalSlot";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../components/Primitives/IconContainer/IconContainer";
import PrimaryHeader from "../../../../components/DataDisplay/Headers/PrimaryHeader";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../components/Primitives/Divider/Divider";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../components/Keypad";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { ClockIcon } from "../../../../components/Icons/ClockIcon";
import { CalendarIcon } from "../../../../components/Icons/CalendarIcon";
import { RocketIcon } from "../../../../components/Icons/RocketIcon";
import DirectToBitcoinIcon from "../../../../components/Icons/DirectToBitcoinIcon";
import AutomationSuccess from "../../../Templates/Success/AutomationSuccess";
import DirectToBitcoinSlot from "../../../Slots/BTC/DirectToBitcoinSlot";
import { colorMaps, spacing } from "../../../../components/tokens";

type FlowStep = "intro" | "configure" | "enterCustom" | "confirm";

export interface DirectToBitcoinFlowProps {
  /** If true, skip intro and show edit mode with Modify button */
  isFeatureActive?: boolean;
  /** Initial percentage when feature is active */
  initialPercentage?: number;
  onSetUpDeposit?: () => void;
  /** Called with selected percentage when flow completes */
  onComplete: (percentage: number) => void;
  onClose: () => void;
  /** Called when user taps "Turn off" */
  onTurnOff?: () => void;
}

export default function DirectToBitcoinFlow({
  isFeatureActive = false,
  initialPercentage = 25,
  onSetUpDeposit,
  onComplete,
  onClose,
  onTurnOff,
}: DirectToBitcoinFlowProps) {
  const initialStep: FlowStep = isFeatureActive ? "configure" : "intro";
  const [flowStack, setFlowStack] = useState<FlowStep[]>([initialStep]);
  const [selectedPercentage, setSelectedPercentage] = useState<number>(
    isFeatureActive ? initialPercentage : 75
  );
  const [customPercentageInput, setCustomPercentageInput] = useState<string>("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTurnOffModal, setShowTurnOffModal] = useState(false);
  const successRef = useRef<FullscreenTemplateRef>(null);

  const handleSelectPercentage = () => {
    setFlowStack(prev => [...prev, "configure"]);
  };

  const handleConfigureBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleCustomPress = () => {
    setCustomPercentageInput(selectedPercentage.toString());
    setFlowStack(prev => [...prev, "enterCustom"]);
  };

  const handleCustomBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleCustomConfirm = () => {
    const value = parseInt(customPercentageInput, 10) || 0;
    const clampedValue = Math.max(0, Math.min(100, value));
    setSelectedPercentage(clampedValue);
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfigureContinue = () => {
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleConfirmBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleDone = () => {
    successRef.current?.close();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onComplete(selectedPercentage);
  };

  const handleFlowClose = () => {
    setFlowStack([]);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

  const handleNumberPress = (num: string) => {
    setCustomPercentageInput(prev => {
      if (prev === "0") return num;
      if (prev.length >= 3) return prev;
      return prev + num;
    });
  };

  const handleBackspacePress = () => {
    setCustomPercentageInput(prev => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const cashPercentage = 100 - selectedPercentage;

  const renderScreen = (step: string) => {
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
                secondaryButton={
                  <Button
                    label="Set up direct deposit"
                    hierarchy="secondary"
                    size="md"
                    onPress={onSetUpDeposit}
                  />
                }
                primaryButton={
                  <Button
                    label="Select a percentage"
                    hierarchy="primary"
                    size="md"
                    onPress={handleSelectPercentage}
                  />
                }
              />
            }
          >
            <IntroTemplate
              header="Direct to bitcoin"
              body="Get paid in bitcoin, effortlessly. Choose a percentage of your direct deposit to convert automatically."
            >
              <ListItem
                variant="feature"
                title="Passive stacking"
                secondaryText="Convert a percentage of each direct deposit."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<ClockIcon />} />}
              />
              <ListItem
                variant="feature"
                title="Flexible anytime"
                secondaryText="Start with as little as you like and change as you go."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<CalendarIcon />} />}
              />
              <ListItem
                variant="feature"
                title="No fees for Fold+"
                secondaryText="Fold+ members enjoy fee-free conversions."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RocketIcon />} />}
              />
            </IntroTemplate>
          </FullscreenTemplate>
        );
      case "configure":
        return (
          <FullscreenTemplate
            title={isFeatureActive ? "Direct to bitcoin" : undefined}
            onLeftPress={isFeatureActive ? handleFlowClose : handleConfigureBack}
            scrollable={false}
            navVariant={isFeatureActive ? "start" : "step"}
            footer={
              <ModalFooter
                type="default"
                disclaimer="Changes apply to future direct deposits only."
                primaryButton={
                  <Button
                    label={isFeatureActive ? "Modify" : "Continue"}
                    hierarchy="primary"
                    size="md"
                    onPress={isFeatureActive ? handleConfirm : handleConfigureContinue}
                  />
                }
                secondaryButton={isFeatureActive ? (
                  <Button
                    label="Turn off Direct to bitcoin"
                    hierarchy="tertiary"
                    size="md"
                    onPress={() => setShowTurnOffModal(true)}
                  />
                ) : undefined}
              />
            }
          >
            <DirectToBitcoinSlot
              selectedPercentage={selectedPercentage}
              onPercentageSelect={setSelectedPercentage}
              onCustomPress={handleCustomPress}
            />
          </FullscreenTemplate>
        );
      case "enterCustom":
        const displayValue = `${customPercentageInput}%`;
        const isValid = parseInt(customPercentageInput, 10) > 0 && parseInt(customPercentageInput, 10) <= 100;
        return (
          <FullscreenTemplate
            title="Direct to bitcoin"
            onLeftPress={handleCustomBack}
            scrollable={false}
            navVariant="step"
          >
            <EnterAmount>
              <View style={styles.customContent}>
                <CurrencyInput
                  value={displayValue}
                  topContextSlot={
                    <TopContext variant="btc" value="How much do you want to convert?" />
                  }
                  bottomContextSlot={
                    <BottomContext variant="empty" />
                  }
                />
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={true}
                actionBar
                actionLabel="Confirm"
                actionDisabled={!isValid}
                onActionPress={handleCustomConfirm}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            onLeftPress={handleConfirmBack}
            scrollable={true}
            navVariant="step"
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Confirm"
                    hierarchy="primary"
                    size="md"
                    onPress={handleConfirm}
                  />
                }
              />
            }
          >
            <View style={styles.confirmContent}>
              <PrimaryHeader
                header={`Invest ${selectedPercentage}% of direct deposits in bitcoin`}
                body="Total amount will vary based on the price of bitcoin and the amount of your paycheck deposited to Fold."
                hasDisclaimer={false}
              />
              <View style={styles.receiptContainer}>
                <ReceiptDetails>
                  <ListItemReceipt label="Direct to bitcoin" value={`${selectedPercentage}% per deposit`} />
                  <ListItemReceipt label="Direct to cash" value={`${cashPercentage}% per deposit`} />
                  <ListItemReceipt label="Processing fees" value="4%" />
                </ReceiptDetails>
                <Divider />
                <FoldText type="body-sm" style={styles.receiptDisclaimer}>
                  The minimum bitcoin purchase is $10. If your chosen percentage results in less than $10, the deposit will bypass the Direct to Bitcoin automation and will instead be added to your cash balance.
                </FoldText>
              </View>
            </View>
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <FullscreenTemplate
        ref={successRef}
        onLeftPress={handleSuccessClose}
        scrollable={false}
        navVariant="start"
        footer={
          <ModalFooter
            type="default"
            primaryButton={
              <Button
                label="Done"
                hierarchy="primary"
                size="md"
                onPress={handleDone}
              />
            }
          />
        }
      >
        <AutomationSuccess
          header={isFeatureActive
            ? `Direct to bitcoin updated to ${selectedPercentage}%`
            : `You're investing ${selectedPercentage}% of direct deposits in bitcoin`
          }
          body="Funds will be made available in your bitcoin balance."
        />
      </FullscreenTemplate>
    );
  }

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
            icon={<DirectToBitcoinIcon />}
            title="Turn off Direct to bitcoin"
            body="Any incoming deposits that have not settled yet will no longer converted to bitcoin."
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
  customContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
  confirmContent: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  receiptContainer: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["600"],
  },
  receiptDisclaimer: {
    color: colorMaps.face.tertiary,
  },
});
