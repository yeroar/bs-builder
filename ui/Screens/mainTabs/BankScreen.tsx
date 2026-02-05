import React, { useState } from "react";
import { View, StyleSheet, Modal, Keyboard, LayoutAnimation, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import RootTemplate from "../../Templates/RootTemplate";
import { FoldText } from "../../../components/Primitives/FoldText";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { colorMaps, spacing } from "../../../components/tokens";

import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import MiniModal from "../../../components/Modals/MiniModal";
import ActivateDebitCardSlot from "../../../components/Modals/minimodalslots/ActivateDebitCardSlot";
import ActivationSuccessSlot from "../../Slots/ActivateCards/ActivationSuccessSlot";
import ModalFooter from "../../../components/Modals/ModalFooter";
import BankHomeSlot from "../../Slots/MainTabs/BankHomeSlot";
import BtcSlot from "../../Slots/BTC/BtcSlot";
import CashSlot from "../../Slots/Cash/CashSlot";
import BtcBuyModalSlot, { BuyAmount } from "../../Slots/BTC/BtcBuyModalSlot";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import { BtcBuyFlow, BtcSellFlow, BtcSendFlow, BtcAutoStackFlow, DepositFlow, DirectToBitcoinFlow, RoundUpsFlow } from "../flows";
import { DirectToBitcoinConfig, AutoStackConfig } from "../../Slots/BTC/BtcSlot";
import { RoundUpsConfig } from "../../Slots/Cash/CashSlot";
import { Multiplier } from "../../Slots/Cash/RoundUpsSlot";
import RedeemBtcGiftCardSlot from "../../Slots/GiftCard/RedeemBtcGiftCardSlot";
import RedeemBtcGiftCardConfirmation from "../../Templates/TxConfirmation/instances/GiftCard/RedeemBtcGiftCardConfirmation";
import RedeemBtcGiftCardSuccess from "../../Templates/Success/instances/GiftCard/RedeemBtcGiftCardSuccess";

type FlowType = "buy" | "sell" | "send" | "autoStack" | "deposit" | "directToBitcoin" | "roundUps";
type RedeemStep = "entry" | "confirmation" | "success";

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

  // Active automation configs (persisted after flow completion)
  const [directToBitcoinConfig, setDirectToBitcoinConfig] = useState<DirectToBitcoinConfig | undefined>(undefined);
  const [roundUpsConfig, setRoundUpsConfig] = useState<RoundUpsConfig | undefined>(undefined);
  const [roundUpsCurrentAmount, setRoundUpsCurrentAmount] = useState(0);
  const [autoStackConfig, setAutoStackConfig] = useState<AutoStackConfig | undefined>(undefined);

  // Redeem BTC Gift Card modal state
  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);
  const [redeemStep, setRedeemStep] = useState<RedeemStep>("entry");
  const [redeemCardNumber, setRedeemCardNumber] = useState("");
  const [redeemPin, setRedeemPin] = useState("");

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
  const handleOpenDirectToBitcoinFlow = () => setActiveFlow("directToBitcoin");
  const handleOpenRoundUpsFlow = () => setActiveFlow("roundUps");

  const handleFlowComplete = () => {
    const wasDepositFlow = activeFlow === "deposit";
    setActiveFlow(null);
    if (wasDepositFlow) {
      setShowCashSlot(true);
    } else {
      setShowBtcSlot(true);
    }
  };

  const handleFlowClose = () => {
    setActiveFlow(null);
  };

  // Redeem handlers
  const handleOpenRedeemModal = () => {
    setRedeemStep("entry");
    setRedeemCardNumber("");
    setRedeemPin("");
    setIsRedeemModalVisible(true);
  };
  const handleCloseRedeemModal = () => setIsRedeemModalVisible(false);
  const handleRedeemContinue = () => setRedeemStep("confirmation");
  const handleRedeemBack = () => setRedeemStep("entry");
  const handleRedeemConfirm = () => setRedeemStep("success");
  const handleRedeemDone = () => {
    setIsRedeemModalVisible(false);
    setRedeemStep("entry");
  };
  const isRedeemFormValid = redeemCardNumber.length > 0 && redeemPin.length > 0;

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
            onRedeemPress={handleOpenRedeemModal}
            onDirectToBitcoinPress={handleOpenDirectToBitcoinFlow}
            directToBitcoinConfig={directToBitcoinConfig}
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
            onDirectToBitcoinPress={handleOpenDirectToBitcoinFlow}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            onRewardsPress={() => console.log("Rewards pressed")}
            autoStackConfig={autoStackConfig}
            directToBitcoinConfig={directToBitcoinConfig}
          />
        </FullscreenTemplate>
      )}

      {/* Cash Screen */}
      {showCashSlot && (
        <FullscreenTemplate onLeftPress={handleCloseCashScreen} scrollable>
          <CashSlot
            onAddCashPress={handleOpenDepositFlow}
            onRoundUpsPress={handleOpenRoundUpsFlow}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            roundUpsConfig={roundUpsConfig}
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

      {/* Redeem BTC Gift Card Flow */}
      {isRedeemModalVisible && redeemStep === "entry" && (
        <FullscreenTemplate
          onLeftPress={handleCloseRedeemModal}
          scrollable
          footer={
            <ModalFooter
              type="default"
              disclaimer="Applicable bitcoin exchange fees may apply. Need a Bitcoin Gift Card?"
              primaryButton={
                <Button label="Continue" hierarchy="primary" size="md" disabled={!isRedeemFormValid} onPress={handleRedeemContinue} />
              }
            />
          }
        >
          <RedeemBtcGiftCardSlot
            cardNumber={redeemCardNumber}
            pin={redeemPin}
            onCardNumberChange={setRedeemCardNumber}
            onPinChange={setRedeemPin}
          />
        </FullscreenTemplate>
      )}

      {/* Redeem BTC Gift Card Confirmation */}
      {isRedeemModalVisible && redeemStep === "confirmation" && (
        <FullscreenTemplate
          title="Redeem gift card"
          navVariant="step"
          onLeftPress={handleRedeemBack}
          footer={
            <ModalFooter
              type="default"
              disclaimer="Having trouble redeeming?"
              primaryButton={
                <Button label="Redeem" hierarchy="primary" size="md" onPress={handleRedeemConfirm} />
              }
            />
          }
        >
          <RedeemBtcGiftCardConfirmation />
        </FullscreenTemplate>
      )}

      {/* Redeem BTC Gift Card Success */}
      {isRedeemModalVisible && redeemStep === "success" && (
        <RedeemBtcGiftCardSuccess onDone={handleRedeemDone} />
      )}

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
          isFeatureActive={!!autoStackConfig}
          initialConfig={autoStackConfig}
          onComplete={(config) => {
            setAutoStackConfig(config);
            setActiveFlow(null);
            setShowBtcSlot(true);
          }}
          onClose={handleFlowClose}
          onTurnOff={() => {
            setAutoStackConfig(undefined);
            setActiveFlow(null);
            setShowBtcSlot(true);
          }}
        />
      )}

      {activeFlow === "deposit" && (
        <DepositFlow
          onComplete={handleFlowComplete}
          onClose={handleFlowClose}
        />
      )}

      {activeFlow === "directToBitcoin" && (
        <DirectToBitcoinFlow
          isFeatureActive={!!directToBitcoinConfig}
          initialPercentage={directToBitcoinConfig?.bitcoinPercent}
          onSetUpDeposit={() => {
            setActiveFlow("deposit");
          }}
          onComplete={(percentage: number) => {
            setDirectToBitcoinConfig({ bitcoinPercent: percentage });
            setActiveFlow(null);
            setShowBtcSlot(true);
          }}
          onClose={handleFlowClose}
          onTurnOff={() => {
            setDirectToBitcoinConfig(undefined);
            setActiveFlow(null);
            setShowBtcSlot(true);
          }}
        />
      )}

      {activeFlow === "roundUps" && (
        <RoundUpsFlow
          isFeatureActive={!!roundUpsConfig}
          initialMultiplier={roundUpsConfig?.multiplier as Multiplier}
          currentAmount={roundUpsCurrentAmount}
          onComplete={(multiplier: string) => {
            setRoundUpsConfig({ multiplier });
            setActiveFlow(null);
            setShowCashSlot(true);
          }}
          onClose={handleFlowClose}
          onTurnOff={() => {
            setRoundUpsConfig(undefined);
            setRoundUpsCurrentAmount(0);
            setActiveFlow(null);
            setShowCashSlot(true);
          }}
        />
      )}
    </>
  );
}
