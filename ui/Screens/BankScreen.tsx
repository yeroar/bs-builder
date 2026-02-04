import React, { useState } from "react";
import { View, StyleSheet, Modal, Keyboard, LayoutAnimation, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import RootTemplate from "../Templates/RootTemplate";
import { FoldText } from "../../components/Primitives/FoldText";
import FoldPressable from "../../components/Primitives/FoldPressable";
import Button from "../../components/Primitives/Buttons/Button/Button";
import { colorMaps, spacing } from "../../components/tokens";

import { BellIcon } from "../../components/Icons/BellIcon";
import { ClockIcon } from "../../components/Icons/ClockIcon";
import MiniModal from "../../components/modals/MiniModal";
import ActivateDebitCardSlot from "../../components/modals/minimodalslots/ActivateDebitCardSlot";
import ActivationSuccessSlot from "../Slots/ActivationSuccessSlot";
import ModalFooter from "../../components/modals/ModalFooter";
import BankHomeSlot from "../Slots/BankHomeSlot";
import BtcSlot from "../Slots/BTC/BtcSlot";
import CashSlot from "../Slots/Cash/CashSlot";
import BtcBuyModalSlot, { BuyAmount } from "../Slots/BTC/BtcBuyModalSlot";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import { BtcBuyFlow, BtcSellFlow, BtcSendFlow, BtcAutoStackFlow, OneTimeDepositFlow } from "./flows";

type FlowType = "buy" | "sell" | "send" | "autoStack" | "deposit";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
}

export default function BankScreen({ onTabPress, onHistoryPress, onMenuPress }: BankScreenProps) {
  // Card activation modal state
  const [isActivateModalVisible, setIsActivateModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [isActivationSuccess, setIsActivationSuccess] = useState(false);

  // BTC screen state
  const [showBtcSlot, setShowBtcSlot] = useState(false);

  // Cash screen state
  const [showCashSlot, setShowCashSlot] = useState(false);

  // Buy amount selection modal state
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const [selectedBuyAmount, setSelectedBuyAmount] = useState<BuyAmount>(null);

  // Active flow state
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);

  const isFormValid = cardNumber.length > 0 && cvv.length > 0;

  // Card activation handlers
  const handleOpenActivateModal = () => {
    setIsActivationSuccess(false);
    setCardNumber("");
    setCVV("");
    setIsActivateModalVisible(true);
  };

  const handleCloseActivateModal = () => {
    Keyboard.dismiss();
    setIsActivateModalVisible(false);
  };

  const handleActivateCard = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.opacity, springDamping: 0.7 },
        update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      });
      setIsActivationSuccess(true);
    }, 150);
  };

  // BTC screen handlers
  const handleOpenBtcScreen = () => setShowBtcSlot(true);
  const handleCloseBtcScreen = () => setShowBtcSlot(false);

  // Cash screen handlers
  const handleOpenCashScreen = () => setShowCashSlot(true);
  const handleCloseCashScreen = () => setShowCashSlot(false);

  // Buy modal handlers
  const handleOpenBuyModal = () => {
    setSelectedBuyAmount(null);
    setIsBuyModalVisible(true);
  };

  const handleCloseBuyModal = () => setIsBuyModalVisible(false);

  const handleContinueBuy = () => {
    setIsBuyModalVisible(false);
    setActiveFlow("buy");
  };

  // Flow handlers
  const handleOpenSellFlow = () => setActiveFlow("sell");
  const handleOpenSendFlow = () => setActiveFlow("send");
  const handleOpenAutoStackFlow = () => setActiveFlow("autoStack");
  const handleOpenDepositFlow = () => setActiveFlow("deposit");

  const handleFlowComplete = () => {
    setActiveFlow(null);
    setShowBtcSlot(true);
  };

  const handleFlowClose = () => {
    setActiveFlow(null);
  };

  return (
    <>
      <RootTemplate
        variant="root"
        activeTab="left"
        onTabPress={onTabPress}
        onLeftPress={onMenuPress}
        scrollable={true}
        homeSlot={
          <BankHomeSlot
            onActivateCard={handleOpenActivateModal}
            onBitcoinPress={handleOpenBtcScreen}
            onCashPress={handleOpenCashScreen}
            onBuyPress={handleOpenBuyModal}
            onSellPress={handleOpenSellFlow}
            onDepositPress={handleOpenDepositFlow}
          />
        }
        rightComponents={[
          <FoldPressable key="clock" onPress={onHistoryPress}>
            <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>,
          <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
            <BellIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>
        ]}
      />

      {/* Card Activation Modal */}
      <Modal
        visible={isActivateModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleCloseActivateModal}
      >
        <MiniModal
          variant={isActivationSuccess ? "default" : "keyboard"}
          onClose={handleCloseActivateModal}
          showHeader={false}
          footer={
            isActivationSuccess ? (
              <ModalFooter
                primaryButton={<Button label="Done" hierarchy="primary" onPress={handleCloseActivateModal} />}
              />
            ) : (
              <ModalFooter
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    Activate by phone: <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>1-833-904-2761</FoldText>
                  </FoldText>
                }
                primaryButton={
                  <Button label="Activate card" hierarchy="primary" disabled={!isFormValid} onPress={handleActivateCard} />
                }
              />
            )
          }
        >
          {isActivationSuccess ? (
            <ActivationSuccessSlot />
          ) : (
            <ActivateDebitCardSlot
              cardNumber={cardNumber}
              cvv={cvv}
              onCardNumberChange={setCardNumber}
              onCVVChange={setCVV}
            />
          )}
        </MiniModal>
      </Modal>

      {/* Bitcoin Screen */}
      {showBtcSlot && (
        <FullscreenTemplate onLeftPress={handleCloseBtcScreen}>
          <BtcSlot
            onBuyPress={handleOpenBuyModal}
            onSellPress={handleOpenSellFlow}
            onSendPress={handleOpenSendFlow}
            onAutoStackPress={handleOpenAutoStackFlow}
            onDirectToBitcoinPress={() => console.log("Direct to bitcoin pressed")}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            onRewardsPress={() => console.log("Rewards pressed")}
          />
        </FullscreenTemplate>
      )}

      {/* Cash Screen */}
      {showCashSlot && (
        <FullscreenTemplate onLeftPress={handleCloseCashScreen} scrollable>
          <CashSlot
            onAddCashPress={handleOpenDepositFlow}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
          />
        </FullscreenTemplate>
      )}

      {/* Buy Amount Selection Modal */}
      <Modal
        visible={isBuyModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleCloseBuyModal}
      >
        <MiniModal
          variant="default"
          onClose={handleCloseBuyModal}
          showHeader={false}
          footer={
            <ModalFooter
              primaryButton={
                <Button
                  label="Continue"
                  hierarchy="primary"
                  disabled={selectedBuyAmount === null}
                  onPress={handleContinueBuy}
                />
              }
            />
          }
        >
          <BtcBuyModalSlot
            selectedAmount={selectedBuyAmount}
            onSelectAmount={setSelectedBuyAmount}
          />
        </MiniModal>
      </Modal>

      {/* Flow Screens */}
      {activeFlow === "buy" && (
        <BtcBuyFlow
          initialAmount={selectedBuyAmount ?? undefined}
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}

      {activeFlow === "sell" && (
        <BtcSellFlow
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}

      {activeFlow === "send" && (
        <BtcSendFlow
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}

      {activeFlow === "autoStack" && (
        <BtcAutoStackFlow
          frequency="Daily"
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}

      {activeFlow === "deposit" && (
        <OneTimeDepositFlow
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}
    </>
  );
}
