import React, { useState } from "react";
import { Modal } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import InfoCircleIcon from "../../../components/Icons/InfoCircleIcon";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import BtcSlot from "../../Slots/BTC/BtcSlot";
import RewardsSlot from "../../Slots/BTC/RewardsSlot";
import BitcoinRewardsSlot from "../../Slots/BTC/BitcoinRewardsSlot";
import SendOrReceiveSlot from "../../Slots/BTC/SendOrReceiveSlot";
import ReceiveBitcoinSlot from "../../Slots/BTC/ReceiveBitcoinSlot";
import BitcoinAddressSlot from "../../Slots/BTC/BitcoinAddressSlot";
import { BtcSendFlow, BtcAutoStackFlow, DirectToBitcoinFlow, RedeemGiftCardFlow } from "../flows";
import { AutoStackConfig, DirectToBitcoinConfig } from "../../Slots/BTC/BtcSlot";
import { TransactionCategory } from "../../Slots/Transactions/TransactionsSlot";
import { FlowType, BankActions } from "./hooks/useBankState";

export interface BtcRouterProps {
  visible: boolean;
  onClose: () => void;
  activeFlow: FlowType | null;
  autoStackConfig?: AutoStackConfig;
  directToBitcoinConfig?: DirectToBitcoinConfig;
  actions: BankActions;
  onHistoryPress: (category?: TransactionCategory) => void;
  onBuySellFlow: (flow: "buy" | "sell", opts?: { initialAmount?: string; onComplete?: () => void }) => void;
}

export default function BtcRouter({
  visible,
  onClose,
  activeFlow,
  autoStackConfig,
  directToBitcoinConfig,
  actions,
  onHistoryPress,
  onBuySellFlow,
}: BtcRouterProps) {
  const [showRewardsScreen, setShowRewardsScreen] = useState(false);
  const [showRewardsInfoModal, setShowRewardsInfoModal] = useState(false);
  const [showSendReceiveModal, setShowSendReceiveModal] = useState(false);
  const [showReceiveScreen, setShowReceiveScreen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  return (
    <>
      {/* Bitcoin Screen */}
      {visible && (
        <FullscreenTemplate onLeftPress={onClose}>
          <BtcSlot
            onBuyPress={() => onBuySellFlow("buy", { onComplete: actions.openBtcScreen })}
            onSellPress={() => onBuySellFlow("sell", { onComplete: actions.openBtcScreen })}
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

      {/* BTC Flows */}
      {activeFlow === "redeem" && (
        <RedeemGiftCardFlow
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
    </>
  );
}
