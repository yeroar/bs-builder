import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import ActivateCardModal from "../../Slots/Modals/ActivateCardModal";
import BtcBuyAmountModal from "../../Slots/Modals/BtcBuyAmountModal";
import BankHomeSlot from "../../Slots/MainTabs/BankHomeSlot";
import BtcSlot from "../../Slots/BTC/BtcSlot";
import CashSlot from "../../Slots/Cash/CashSlot";
import { BuyAmount } from "../../Slots/BTC/BtcBuyModalSlot";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import { BtcBuyFlow, BtcSellFlow, BtcSendFlow, BtcAutoStackFlow, DepositFlow, DirectToBitcoinFlow, RoundUpsFlow, RedeemGiftCardFlow } from "../flows";
import { Multiplier } from "../../Slots/Cash/RoundUpsSlot";
import useBankState from "./hooks/useBankState";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
}

export default function BankScreen({ onTabPress, onHistoryPress, onMenuPress }: BankScreenProps) {
  // Bank state from custom hook
  const [state, actions] = useBankState();
  const { activeFlow, pendingBuyAmount, showBtcScreen, showCashScreen, directToBitcoinConfig, roundUpsConfig, autoStackConfig } = state;

  // Local modal state (UI-only concerns)
  const [isActivateModalVisible, setIsActivateModalVisible] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);

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
            onBuyPress={handleOpenBuyModal}
            onSellPress={() => actions.openFlow("sell")}
            onDepositPress={() => actions.openFlow("deposit")}
            onRedeemPress={() => actions.openFlow("redeem")}
            onDirectToBitcoinPress={() => actions.openFlow("directToBitcoin")}
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
      <ActivateCardModal
        visible={isActivateModalVisible}
        onClose={handleCloseActivateModal}
      />

      {/* Bitcoin Screen */}
      {showBtcScreen && (
        <FullscreenTemplate onLeftPress={actions.closeBtcScreen}>
          <BtcSlot
            onBuyPress={handleOpenBuyModal}
            onSellPress={() => actions.openFlow("sell")}
            onSendPress={() => actions.openFlow("send")}
            onAutoStackPress={() => actions.openFlow("autoStack")}
            onDirectToBitcoinPress={() => actions.openFlow("directToBitcoin")}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            onRewardsPress={() => console.log("Rewards pressed")}
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
            onRoundUpsPress={() => actions.openFlow("roundUps")}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            roundUpsConfig={roundUpsConfig}
          />
        </FullscreenTemplate>
      )}

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
    </>
  );
}
