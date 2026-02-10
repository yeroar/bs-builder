import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import ActivateCardModal from "../../Slots/Modals/ActivateCardModal";
import BtcBuyAmountModal from "../../Slots/Modals/BtcBuyAmountModal";
import BankHomeSlot from "../../Slots/MainTabs/BankHomeSlot";
import { BuyAmount } from "../../Slots/BTC/BtcBuyModal";
import { TransactionCategory } from "../../Slots/Transactions/TransactionsSlot";
import useBankState from "./hooks/useBankState";
import BtcRouter from "./BtcRouter";
import CashRouter from "./CashRouter";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "componentLibrary") => void;
  onHistoryPress: (category?: TransactionCategory) => void;
  onMenuPress: () => void;
  onBuySellFlow: (flow: "buy" | "sell", opts?: { initialAmount?: string; onComplete?: () => void }) => void;
}

export default function BankScreen({ onTabPress, onHistoryPress, onMenuPress, onBuySellFlow }: BankScreenProps) {
  const [state, actions] = useBankState();
  const { activeFlow, flowKey, showBtcScreen, showCashScreen, directToBitcoinConfig, roundUpsConfig, autoStackConfig, recurringDepositConfig } = state;

  // Local modal state (UI-only concerns)
  const [isActivateModalVisible, setIsActivateModalVisible] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);

  const handleBuyPress = () => {
    setIsBuyModalVisible(true);
  };

  const handleSellPress = () => {
    onBuySellFlow("sell", { onComplete: () => actions.openBtcScreen() });
  };

  // Buy modal handlers
  const handleBuyAmountSelected = (amount: BuyAmount) => {
    setIsBuyModalVisible(false);
    onBuySellFlow("buy", { initialAmount: amount ?? undefined, onComplete: () => actions.openBtcScreen() });
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
            onActivateCard={() => setIsActivateModalVisible(true)}
            onBitcoinPress={actions.openBtcScreen}
            onCashPress={actions.openCashScreen}
            onBuyPress={handleBuyPress}
            onSellPress={handleSellPress}
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
        onClose={() => setIsActivateModalVisible(false)}
      />

      {/* Buy Amount Selection Modal */}
      <BtcBuyAmountModal
        visible={isBuyModalVisible}
        onClose={() => setIsBuyModalVisible(false)}
        onContinue={handleBuyAmountSelected}
      />

      <BtcRouter
        visible={showBtcScreen}
        onClose={actions.closeBtcScreen}
        activeFlow={activeFlow}
        flowKey={flowKey}
        autoStackConfig={autoStackConfig}
        directToBitcoinConfig={directToBitcoinConfig}
        actions={actions}
        onHistoryPress={onHistoryPress}
        onBuySellFlow={onBuySellFlow}
      />

      <CashRouter
        visible={showCashScreen}
        onClose={actions.closeCashScreen}
        activeFlow={activeFlow}
        flowKey={flowKey}
        roundUpsConfig={roundUpsConfig}
        recurringDepositConfig={recurringDepositConfig}
        actions={actions}
        onHistoryPress={onHistoryPress}
      />
    </>
  );
}
