import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { RoundUpsIcon } from "../../../../components/Icons/RoundUpsIcon";
import RoundUpsIntro from "../../../Slots/Cash/RoundUpsIntro";
import RoundUpsSlot, { Multiplier } from "../../../Slots/Cash/RoundUpsSlot";
import RoundUpsSuccess from "../../../Slots/Cash/RoundUpsSuccess";
import RemoveConfirmModal from "../../../Slots/Modals/RemoveConfirmModal";

type FlowStep = "intro" | "configure" | "details";

export interface RoundUpsFlowProps {
  /** If true, skip intro and show edit mode with Modify button */
  isFeatureActive?: boolean;
  /** Initial multiplier when feature is active */
  initialMultiplier?: Multiplier;
  /** Current round-up amount accumulated */
  currentAmount?: number;
  /** Called with selected multiplier when flow completes */
  onComplete: (multiplier: string) => void;
  onClose: () => void;
  /** Called when user taps "Turn off" */
  onTurnOff?: () => void;
}

export default function RoundUpsFlow({
  isFeatureActive = false,
  initialMultiplier = "2x",
  currentAmount = 0,
  onComplete,
  onClose,
  onTurnOff,
}: RoundUpsFlowProps) {
  const initialStep: FlowStep = isFeatureActive ? "details" : "intro";
  const [flowStack, setFlowStack] = useState<FlowStep[]>([initialStep]);
  const [selectedMultiplier, setSelectedMultiplier] = useState<Multiplier>(
    isFeatureActive ? initialMultiplier : "2x"
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTurnOffModal, setShowTurnOffModal] = useState(false);
  const successRef = useRef<FullscreenTemplateRef>(null);

  const handleIntroContinue = () => {
    setFlowStack(prev => [...prev, "configure"]);
  };

  const handleBack = () => {
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
    onComplete(selectedMultiplier);
  };

  const handleFlowClose = () => {
    setFlowStack([]);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

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
            <RoundUpsIntro />
          </FullscreenTemplate>
        );
      case "configure":
        return (
          <FullscreenTemplate
            onLeftPress={handleBack}
            scrollable={false}
            navVariant="step"
            footer={
              <ModalFooter
                type="default"
                disclaimer="Only everyday purchases qualify—excludes bitcoin and ACH."
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
            <RoundUpsSlot
              selectedMultiplier={selectedMultiplier}
              onMultiplierSelect={setSelectedMultiplier}
              currentAmount={currentAmount}
            />
          </FullscreenTemplate>
        );
      case "details":
        return (
          <FullscreenTemplate
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant="start"
            footer={
              <ModalFooter
                type="default"
                disclaimer="Only everyday purchases qualify—excludes bitcoin and ACH."
                primaryButton={
                  <Button
                    label="Modify"
                    hierarchy="primary"
                    size="md"
                    onPress={handleConfirm}
                  />
                }
                secondaryButton={
                  <Button
                    label="Turn off Round ups"
                    hierarchy="tertiary"
                    size="md"
                    onPress={() => setShowTurnOffModal(true)}
                  />
                }
              />
            }
          >
            <RoundUpsSlot
              selectedMultiplier={selectedMultiplier}
              onMultiplierSelect={setSelectedMultiplier}
              currentAmount={currentAmount}
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
      >
        <RoundUpsSuccess
          multiplier={selectedMultiplier}
          isUpdate={isFeatureActive}
          onDone={handleDone}
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
        icon={<RoundUpsIcon />}
        title="Turn off Round ups"
        body="Are you sure you want to stop your round-ups and reset your progress? You can restart any time."
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
