import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import DirectToBitcoinIcon from "../../../../components/Icons/DirectToBitcoinIcon";
import RemoveConfirmModal from "../../../Slots/Modals/RemoveConfirmModal";
import DirectToBitcoinIntro from "../../../Slots/BTC/DirectToBitcoinIntro";
import DirectToBitcoin from "../../../Slots/BTC/DirectToBitcoin";
import DirectToBitcoinEnterCustom from "../../../Slots/BTC/DirectToBitcoinEnterCustom";
import DirectToBitcoinConfirm from "../../../Slots/BTC/DirectToBitcoinConfirm";
import DirectToBitcoinSuccess from "../../../Slots/BTC/DirectToBitcoinSuccess";

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
    setFlowStack(prev => [...prev, "enterCustom"]);
  };

  const handleCustomBack = () => {
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
            <DirectToBitcoinIntro />
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
            <DirectToBitcoin
              selectedPercentage={selectedPercentage}
              onPercentageSelect={setSelectedPercentage}
              onCustomPress={handleCustomPress}
            />
          </FullscreenTemplate>
        );
      case "enterCustom":
        return (
          <FullscreenTemplate
            title="Direct to bitcoin"
            onLeftPress={handleCustomBack}
            scrollable={false}
            navVariant="step"
          >
            <DirectToBitcoinEnterCustom
              initialValue={selectedPercentage}
              onConfirm={(value) => {
                setSelectedPercentage(value);
                setFlowStack(prev => prev.slice(0, -1));
              }}
            />
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
            <DirectToBitcoinConfirm
              bitcoinPercentage={selectedPercentage}
              cashPercentage={cashPercentage}
            />
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
        <DirectToBitcoinSuccess
          percentage={selectedPercentage}
          isUpdate={isFeatureActive}
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

      <RemoveConfirmModal
        visible={showTurnOffModal}
        icon={<DirectToBitcoinIcon />}
        title="Turn off Direct to bitcoin"
        body="Any incoming deposits that have not settled yet will no longer converted to bitcoin."
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
