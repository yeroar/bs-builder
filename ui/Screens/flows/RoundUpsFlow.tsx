import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import IntroTemplate from "../../Templates/IntroTemplate";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { TrendUpIcon } from "../../../components/Icons/TrendUpIcon";
import { RoundUpsIcon } from "../../../components/Icons/RoundUpsIcon";
import RoundUpsSlot, { Multiplier } from "../../Slots/Cash/RoundUpsSlot";
import AutomationSuccessSlot from "../../Slots/Cash/AutomationSuccessSlot";

type FlowStep = "intro" | "configure";

export interface RoundUpsFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function RoundUpsFlow({
  onComplete,
  onClose
}: RoundUpsFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["intro"]);
  const [selectedMultiplier, setSelectedMultiplier] = useState<Multiplier>("2x");
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(false);
    onComplete();
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
            onLeftPress={handleConfigureBack}
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
        onLeftPress={handleDone}
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
        <AutomationSuccessSlot
          header={`${selectedMultiplier} Round up confirmed`}
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
