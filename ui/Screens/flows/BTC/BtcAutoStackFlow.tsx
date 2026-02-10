import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { colorMaps } from "../../../../components/tokens";
import { ClockIcon } from "../../../../components/Icons/ClockIcon";
import BtcAutoStackIntro from "../../../Slots/BTC/BtcAutoStackIntro";
import BtcAutoStackEnterAmount from "../../../Slots/BTC/BtcAutoStackEnterAmount";
import BtcAutoStackConfirmation from "../../../Slots/BTC/BtcAutoStackConfirmation";
import BtcAutoStackDetails from "../../../Slots/BTC/BtcAutoStackDetails";
import BtcAutoStackSuccess from "../../../Slots/BTC/BtcAutoStackSuccess";
import FrequencyAutoStack from "../../../Slots/BTC/FrequencyAutoStack";
import { Frequency, AutoStackConfig } from "../../../Slots/BTC/Btc";
import RemoveConfirmModal from "../../../Slots/Modals/RemoveConfirmModal";

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
            <BtcAutoStackIntro />
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
            <FrequencyAutoStack
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
            footer={
              <ModalFooter
                modalVariant="default"
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    You authorize recurring charges in the amount and interval shown above. Please see{" "}
                    <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>
                      terms
                    </FoldText>
                    {" "}for more details.
                  </FoldText>
                }
                primaryButton={
                  <Button
                    label="Confirm auto-stack"
                    hierarchy="primary"
                    size="md"
                    onPress={handleConfirm}
                  />
                }
              />
            }
          >
            <BtcAutoStackConfirmation
              satsAmount={satsAmount}
              usdEquivalent={usdEquivalent}
              totalPurchase={`$${numAmount.toFixed(2)}`}
              totalPurchaseSats={`${satsAmount.toLocaleString()} sats`}
              totalCost={`$${numAmount.toFixed(2)}`}
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
            <BtcAutoStackDetails
              amount={detailsAmount}
              frequency={selectedFrequency}
            />
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
        <BtcAutoStackSuccess
          amount={`$${numAmount.toFixed(0)}`}
          frequency={selectedFrequency}
          onViewDetails={handleSuccessDone}
        />
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

      <RemoveConfirmModal
        visible={showTurnOffModal}
        icon={<ClockIcon />}
        title="Turn off Auto stack"
        body={`Your ${frequencyText} bitcoin buys will stop.`}
        removeLabel="Turn off"
        onRemove={() => {
          setShowTurnOffModal(false);
          onTurnOff?.();
        }}
        onDismiss={() => setShowTurnOffModal(false)}
      />
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
});
