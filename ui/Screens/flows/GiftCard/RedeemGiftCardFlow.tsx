import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenStack from "../../../Templates/ScreenStack";
import RedeemGiftCardEntryScreen from "./RedeemGiftCardEntryScreen";
import RedeemGiftCardConfirmationScreen from "./RedeemGiftCardConfirmationScreen";
import RedeemGiftCardSuccessScreen from "./RedeemGiftCardSuccessScreen";

type FlowStep = "entry" | "confirmation";

export interface RedeemGiftCardFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function RedeemGiftCardFlow({ onComplete, onClose }: RedeemGiftCardFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["entry"]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContinue = (_cardNumber: string, _pin: string) => {
    setFlowStack(prev => [...prev, "confirmation"]);
  };

  const handleBack = () => {
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

  const handleDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    switch (step) {
      case "entry":
        return (
          <RedeemGiftCardEntryScreen
            onClose={() => setFlowStack([])}
            onContinue={handleContinue}
          />
        );
      case "confirmation":
        return (
          <RedeemGiftCardConfirmationScreen
            onBack={handleBack}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return <RedeemGiftCardSuccessScreen onDone={handleDone} />;
  }

  return (
    <View style={styles.container}>
      <ScreenStack
        stack={flowStack}
        renderScreen={renderScreen}
        animateInitial
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
