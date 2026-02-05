import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import IntroTemplate from "../../Templates/IntroTemplate";
import BtcAutoStackEnterAmount from "../../Templates/EnterAmount/instances/BTC/BtcAutoStackEnterAmount";
import BtcAutoStackConfirmationSlot from "../../Templates/TxConfirmation/instances/BTC/BtcAutoStackConfirmationSlot";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/CurrencyInput";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import TileSelector from "../../../components/Selectors/SelectionRow/TileSelector";
import { CalendarIcon } from "../../../components/Icons/CalendarIcon";
import { SettingsIcon } from "../../../components/Icons/SettingsIcon";
import { RocketIcon } from "../../../components/Icons/RocketIcon";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../components/tokens";

type FlowStep = "intro" | "selectFrequency" | "enterAmount" | "confirm";
type Frequency = "Daily" | "Weekly" | "Monthly";

export interface BtcAutoStackFlowProps {
  /** If true, skip intro and go directly to enterAmount */
  isFeatureActive?: boolean;
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcAutoStackFlow({
  isFeatureActive = false,
  onComplete,
  onClose
}: BtcAutoStackFlowProps) {
  // Intro-gated flow: show intro first if feature not active
  const initialStep: FlowStep = isFeatureActive ? "selectFrequency" : "intro";
  const [flowStack, setFlowStack] = useState<FlowStep[]>([initialStep]);

  // Track if intro was shown to determine navVariant for subsequent screens
  const showedIntro = !isFeatureActive;
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("Daily");
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(false);
    onComplete();
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
            <View style={styles.frequencyContent}>
              <TileSelector
                label="Daily"
                variable=""
                state={selectedFrequency === "Daily" ? "active" : "default"}
                onPress={() => setSelectedFrequency("Daily")}
              />
              <TileSelector
                label="Weekly"
                variable=""
                state={selectedFrequency === "Weekly" ? "active" : "default"}
                onPress={() => setSelectedFrequency("Weekly")}
              />
              <TileSelector
                label="Monthly"
                variable=""
                state={selectedFrequency === "Monthly" ? "active" : "default"}
                onPress={() => setSelectedFrequency("Monthly")}
              />
            </View>
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
            <BtcAutoStackConfirmationSlot
              satsAmount={satsAmount}
              usdEquivalent={usdEquivalent}
              totalPurchase={`$${numAmount.toFixed(2)}`}
              totalPurchaseSats={`${satsAmount.toLocaleString()} sats`}
              totalCost={`$${numAmount.toFixed(2)}`}
              onConfirmPress={handleConfirm}
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
        title="Auto stack initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${numAmount.toFixed(2)}`}
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
          primaryButton={
            <Button
              label="Redeem"
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
  frequencyContent: {
    flex: 1,
    padding: spacing["500"],
    gap: spacing["300"],
  },
  successContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
