import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import IntroTemplate from "../../../Templates/IntroTemplate";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import RemoveModalSlot from "../../../Slots/Modals/RemoveModalSlot";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../components/Primitives/IconContainer/IconContainer";
import { TrendUpIcon } from "../../../../components/Icons/TrendUpIcon";
import { RoundUpsIcon } from "../../../../components/Icons/RoundUpsIcon";
import RoundUpsSlot, { Multiplier } from "../../../Slots/Cash/RoundUpsSlot";
import AutomationSuccess from "../../../Templates/Success/AutomationSuccess";

type FlowStep = "intro" | "configure";

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
  const initialStep: FlowStep = isFeatureActive ? "configure" : "intro";
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

  const handleConfigureBack = () => {
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
            <IntroTemplate
              header="Round ups"
              body="Increase your bitcoin holdings automatically. Round up everyday purchases and boost your savings with multipliers."
            >
              <ListItem
                variant="feature"
                title="Pick the multiplier"
                secondaryText="Amplify your round-up and stack even more."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<TrendUpIcon />} />}
              />
              <ListItem
                variant="feature"
                title="Automatic buys"
                secondaryText="When your round-ups hit $10, we buy bitcoin for you."
                leadingSlot={<IconContainer variant="default-fill" size="lg" icon={<RoundUpsIcon />} />}
              />
            </IntroTemplate>
          </FullscreenTemplate>
        );
      case "configure":
        return (
          <FullscreenTemplate
            onLeftPress={isFeatureActive ? handleFlowClose : handleConfigureBack}
            scrollable={false}
            navVariant={isFeatureActive ? "start" : "step"}
            footer={
              <ModalFooter
                type="default"
                disclaimer="Only everyday purchases qualify—excludes bitcoin and ACH."
                primaryButton={
                  <Button
                    label={isFeatureActive ? "Modify" : "Confirm"}
                    hierarchy="primary"
                    size="md"
                    onPress={handleConfirm}
                  />
                }
                secondaryButton={isFeatureActive ? (
                  <Button
                    label="Turn off Round ups"
                    hierarchy="tertiary"
                    size="md"
                    onPress={() => setShowTurnOffModal(true)}
                  />
                ) : undefined}
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
            ? `Round ups updated to ${selectedMultiplier}`
            : `${selectedMultiplier} Round up confirmed`
          }
          body="Bitcoin is purchased every $10 in Round ups; we'll notify you once it's available."
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
            icon={<RoundUpsIcon />}
            title="Turn off Round ups"
            body="Are you sure you want to stop your round-ups and reset your progress? You can restart any time."
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
});
