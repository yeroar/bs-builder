import React, { useState } from "react";
import { Modal } from "react-native";
import RootTemplate from "../../Templates/RootTemplate";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import InfoCircleIcon from "../../../components/Icons/InfoCircleIcon";
import ActivateCardModal from "../../Slots/Modals/ActivateCardModal";
import BtcBuyAmountModal from "../../Slots/Modals/BtcBuyAmountModal";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import BankHomeSlot from "../../Slots/MainTabs/BankHomeSlot";
import BtcSlot from "../../Slots/BTC/BtcSlot";
import CashSlot from "../../Slots/Cash/CashSlot";
import RewardsSlot from "../../Slots/BTC/RewardsSlot";
import BitcoinRewardsSlot from "../../Slots/BTC/BitcoinRewardsSlot";
import SendOrReceiveSlot from "../../Slots/BTC/SendOrReceiveSlot";
import ReceiveBitcoinSlot from "../../Slots/BTC/ReceiveBitcoinSlot";
import BitcoinAddressSlot from "../../Slots/BTC/BitcoinAddressSlot";
import DirectDepositSlot from "../../Slots/Cash/DirectDepositSlot";
import { BuyAmount } from "../../Slots/BTC/BtcBuyModalSlot";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import { BtcBuyFlow, BtcSellFlow, BtcSendFlow, BtcAutoStackFlow, DepositFlow, WithdrawFlow, DirectToBitcoinFlow, RoundUpsFlow, RedeemGiftCardFlow, AuthorizedUserFlow } from "../flows";
import { RecurringDepositFlow } from "../flows/Cash";
import { Multiplier } from "../../Slots/Cash/RoundUpsSlot";
import { TransactionCategory } from "../../Slots/Transactions/TransactionsSlot";
import useBankState from "./hooks/useBankState";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "componentLibrary") => void;
  onHistoryPress: (category?: TransactionCategory) => void;
  onMenuPress: () => void;
}

export default function BankScreen({ onTabPress, onHistoryPress, onMenuPress }: BankScreenProps) {
  // Bank state from custom hook
  const [state, actions] = useBankState();
  const { activeFlow, pendingBuyAmount, showBtcScreen, showCashScreen, directToBitcoinConfig, roundUpsConfig, autoStackConfig, recurringDepositConfig } = state;

  // Local modal state (UI-only concerns)
  const [isActivateModalVisible, setIsActivateModalVisible] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const [showRewardsScreen, setShowRewardsScreen] = useState(false);
  const [showRewardsInfoModal, setShowRewardsInfoModal] = useState(false);
  const [showSendReceiveModal, setShowSendReceiveModal] = useState(false);
  const [showReceiveScreen, setShowReceiveScreen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showDirectDepositScreen, setShowDirectDepositScreen] = useState(false);

  // Card activation handlers
  const handleOpenActivateModal = () => setIsActivateModalVisible(true);
  const handleCloseActivateModal = () => setIsActivateModalVisible(false);

  // Buy modal handlers
  const handleOpenBuyModal = () => setIsBuyModalVisible(true);
  const handleCloseBuyModal = () => setIsBuyModalVisible(false);
  const handleBuyAmountSelected = (amount: BuyAmount) => {
    setIsBuyModalVisible(false);
    actions.openBuyFlow(amount);
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
            onBitcoinPress={actions.openBtcScreen}
            onCashPress={actions.openCashScreen}
            onBuyPress={() => actions.openFlow("buy")}
            onSellPress={() => actions.openFlow("sell")}
            onDepositPress={() => actions.openFlow("deposit")}
            onRedeemPress={() => actions.openFlow("redeem")}
            onDirectToBitcoinPress={() => actions.openFlow("directToBitcoin")}
            directToBitcoinConfig={directToBitcoinConfig}
          />
        }
        rightComponents={[
          <FoldPressable key="clock" onPress={() => onHistoryPress("cash")}>
            <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>,
          <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
            <BellIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>
        ]}
      />

      {/* Card Activation Modal */}
      <ActivateCardModal
        visible={isActivateModalVisible}
        onClose={handleCloseActivateModal}
      />

      {/* Bitcoin Screen */}
      {showBtcScreen && (
        <FullscreenTemplate onLeftPress={actions.closeBtcScreen}>
          <BtcSlot
            onBuyPress={() => actions.openFlow("buy")}
            onSellPress={() => actions.openFlow("sell")}
            onSendPress={() => setShowSendReceiveModal(true)}
            onAutoStackPress={() => actions.openFlow("autoStack")}
            onDirectToBitcoinPress={() => actions.openFlow("directToBitcoin")}
            onSeeAllTransactionsPress={() => onHistoryPress("bitcoin")}
            onRewardsPress={() => setShowRewardsScreen(true)}
            autoStackConfig={autoStackConfig}
            directToBitcoinConfig={directToBitcoinConfig}
          />
        </FullscreenTemplate>
      )}

      {/* Cash Screen */}
      {showCashScreen && (
        <FullscreenTemplate onLeftPress={actions.closeCashScreen} scrollable>
          <CashSlot
            onAddCashPress={() => actions.openFlow("deposit")}
            onWithdrawPress={() => actions.openFlow("withdraw")}
            onAuthorizedUsersPress={() => actions.openFlow("authorizedUser")}
            onRoundUpsPress={() => actions.openFlow("roundUps")}
            onDirectDepositPress={() => setShowDirectDepositScreen(true)}
            onRecurringDepositPress={() => actions.openFlow("manageRecurringDeposit")}
            onSeeAllTransactionsPress={() => onHistoryPress("cash")}
            recurringDepositConfig={recurringDepositConfig}
            roundUpsConfig={roundUpsConfig}
          />
        </FullscreenTemplate>
      )}

      {/* Direct Deposit Screen */}
      {showDirectDepositScreen && (
        <FullscreenTemplate
          onLeftPress={() => setShowDirectDepositScreen(false)}
          scrollable
        >
          <DirectDepositSlot
            onDirectToBitcoinPress={() => {
              setShowDirectDepositScreen(false);
              actions.openFlow("directToBitcoin");
            }}
          />
        </FullscreenTemplate>
      )}

      {/* Rewards Screen */}
      {showRewardsScreen && (
        <FullscreenTemplate
          onLeftPress={() => setShowRewardsScreen(false)}
          scrollable
          rightComponent={
            <FoldPressable onPress={() => setShowRewardsInfoModal(true)}>
              <InfoCircleIcon width={24} height={24} color={colorMaps.face.primary} />
            </FoldPressable>
          }
        >
          <RewardsSlot
            onSendPress={() => console.log("Send rewards pressed")}
            onSeeAllPress={() => console.log("See all rewards pressed")}
          />
        </FullscreenTemplate>
      )}

      {/* Bitcoin Rewards Info Modal */}
      <Modal
        visible={showRewardsInfoModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowRewardsInfoModal(false)}
      >
        <MiniModal
          variant="default"
          onClose={() => setShowRewardsInfoModal(false)}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              secondaryButton={
                <Button
                  label="Dismiss"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => setShowRewardsInfoModal(false)}
                />
              }
            />
          }
        >
          <BitcoinRewardsSlot />
        </MiniModal>
      </Modal>

      {/* Send or Receive Modal */}
      <Modal
        visible={showSendReceiveModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowSendReceiveModal(false)}
      >
        <MiniModal
          variant="default"
          onClose={() => setShowSendReceiveModal(false)}
          showHeader={false}
          footer={
            <ModalFooter
              type="dualButton"
              primaryButton={
                <Button
                  label="Send"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => {
                    setShowSendReceiveModal(false);
                    actions.openFlow("send");
                  }}
                />
              }
              secondaryButton={
                <Button
                  label="Receive"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => {
                    setShowSendReceiveModal(false);
                    setShowReceiveScreen(true);
                  }}
                />
              }
            />
          }
        >
          <SendOrReceiveSlot />
        </MiniModal>
      </Modal>

      {/* Receive Bitcoin Screen */}
      {showReceiveScreen && (
        <FullscreenTemplate
          onLeftPress={() => setShowReceiveScreen(false)}
          scrollable
        >
          <ReceiveBitcoinSlot
            onCopyPress={() => console.log("Copy address pressed")}
            onViewDetailsPress={() => setShowAddressModal(true)}
          />
        </FullscreenTemplate>
      )}

      {/* Bitcoin Address Modal */}
      <Modal
        visible={showAddressModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowAddressModal(false)}
      >
        <MiniModal
          variant="default"
          onClose={() => setShowAddressModal(false)}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Copy"
                  hierarchy="primary"
                  size="md"
                  onPress={() => console.log("Copy address pressed")}
                />
              }
              secondaryButton={
                <Button
                  label="Dismiss"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => setShowAddressModal(false)}
                />
              }
            />
          }
        >
          <BitcoinAddressSlot />
        </MiniModal>
      </Modal>

      {/* Buy Amount Selection Modal */}
      <BtcBuyAmountModal
        visible={isBuyModalVisible}
        onClose={handleCloseBuyModal}
        onContinue={handleBuyAmountSelected}
      />

      {/* Flow Screens */}
      {activeFlow === "redeem" && (
        <RedeemGiftCardFlow
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}
      {activeFlow === "buy" && (
        <BtcBuyFlow
          initialAmount={pendingBuyAmount ?? undefined}
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "sell" && (
        <BtcSellFlow
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "send" && (
        <BtcSendFlow
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "autoStack" && (
        <BtcAutoStackFlow
          isFeatureActive={!!autoStackConfig}
          initialConfig={autoStackConfig}
          onComplete={actions.handleAutoStackComplete}
          onClose={actions.closeFlow}
          onTurnOff={actions.handleTurnOffAutoStack}
        />
      )}

      {activeFlow === "deposit" && (
        <DepositFlow
          onComplete={actions.handleFlowComplete}
          onRecurringDepositComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "withdraw" && (
        <WithdrawFlow
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "directToBitcoin" && (
        <DirectToBitcoinFlow
          isFeatureActive={!!directToBitcoinConfig}
          initialPercentage={directToBitcoinConfig?.bitcoinPercent}
          onSetUpDeposit={() => actions.openFlow("deposit")}
          onComplete={actions.handleDirectToBitcoinComplete}
          onClose={actions.closeFlow}
          onTurnOff={actions.handleTurnOffDirectToBitcoin}
        />
      )}

      {activeFlow === "authorizedUser" && (
        <AuthorizedUserFlow
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "roundUps" && (
        <RoundUpsFlow
          isFeatureActive={!!roundUpsConfig}
          initialMultiplier={roundUpsConfig?.multiplier as Multiplier}
          currentAmount={0}
          onComplete={actions.handleRoundUpsComplete}
          onClose={actions.closeFlow}
          onTurnOff={actions.handleTurnOffRoundUps}
        />
      )}

      {activeFlow === "recurringDeposit" && (
        <RecurringDepositFlow
          mode="create"
          onComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}

      {activeFlow === "manageRecurringDeposit" && (
        <RecurringDepositFlow
          mode="manage"
          onComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}
    </>
  );
}
