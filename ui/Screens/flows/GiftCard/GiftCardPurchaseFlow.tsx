import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal, Animated, Dimensions } from "react-native";
import ScreenStack from "../../../Templates/ScreenStack";
import GCDetailModal from "../../../../components/Modals/GCDetailModal";
import { colorMaps } from "../../../../components/tokens";
import GiftCardSearchScreen from "./GiftCardSearchScreen";
import GiftCardConfirmationScreen from "./GiftCardConfirmationScreen";
import GiftCardSuccessScreen from "./GiftCardSuccessScreen";

const screenHeight = Dimensions.get("window").height;

type FlowStep = "search" | "confirmation";

export interface SelectedCard {
  brand: string;
  title: string;
  logo: React.ReactNode;
  offer: React.ReactNode;
}

export interface GiftCardPurchaseFlowProps {
  card?: SelectedCard;
  onComplete: () => void;
  onClose: () => void;
}

export default function GiftCardPurchaseFlow({
  card,
  onComplete,
  onClose,
}: GiftCardPurchaseFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(() =>
    card ? [] : ["search"]
  );
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(card ?? null);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [showDetail, setShowDetail] = useState(!!card);
  const [showSuccess, setShowSuccess] = useState(false);

  // Animation for yellow fill transition
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const animatedFillHeight = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight],
  });

  const amountLabel = `$${selectedAmount}`;
  const purchaseAmount = `$${(selectedAmount * 0.99).toFixed(2)}`;
  const feeAmount = `+$${(selectedAmount * 0.01).toFixed(2)}`;

  const handleCardSelect = (selected: SelectedCard) => {
    setSelectedCard(selected);
    setShowDetail(true);
  };

  const handleDetailClose = () => {
    setShowDetail(false);
    if (!flowStack.includes("search")) {
      onClose();
    }
  };

  const handleDetailContinue = (amount: number) => {
    setSelectedAmount(amount);
    setShowDetail(false);
    setFlowStack(prev => [...prev, "confirmation"]);
  };

  const handleBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    fillAnimation.setValue(0);

    Animated.timing(fillAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setFlowStack([]);
      setShowSuccess(true);
    });
  };

  const handleFlowEmpty = () => {
    if (!showSuccess && !showDetail) {
      onClose();
    }
  };

  const handleDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    switch (step) {
      case "search":
        return (
          <GiftCardSearchScreen
            onBack={() => setFlowStack([])}
            onCardPress={handleCardSelect}
          />
        );
      case "confirmation":
        return selectedCard ? (
          <GiftCardConfirmationScreen
            card={selectedCard}
            amount={amountLabel}
            purchaseAmount={purchaseAmount}
            feeAmount={feeAmount}
            onBack={handleBack}
            onConfirm={handleConfirm}
          />
        ) : null;
      default:
        return null;
    }
  };

  if (showSuccess && selectedCard) {
    return (
      <GiftCardSuccessScreen
        card={selectedCard}
        amount={amountLabel}
        onDone={handleDone}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScreenStack
          stack={flowStack}
          renderScreen={renderScreen}
          animateInitial
          onEmpty={handleFlowEmpty}
        />
      </View>

      {/* Detail modal — bottom sheet over any step */}
      {showDetail && selectedCard && (
        <Modal
          visible
          transparent
          animationType="none"
          onRequestClose={handleDetailClose}
        >
          <GCDetailModal
            logo={selectedCard.logo}
            title={`${selectedCard.title} gift card`}
            offer={selectedCard.offer}
            onClose={handleDetailClose}
            onContinue={handleDetailContinue}
            onFavorite={() => console.log("Favorite")}
          />
        </Modal>
      )}

      {/* Yellow fill animation overlay */}
      {flowStack.length > 0 && (
        <Animated.View
          style={[
            styles.fillOverlay,
            {
              height: animatedFillHeight,
              backgroundColor: colorMaps.object.primary.bold.default,
            },
          ]}
          pointerEvents="none"
        />
      )}
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
  fillOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 250,
  },
});
