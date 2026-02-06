import React, { useState } from "react";
import { Modal } from "react-native";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import { FoldText } from "../../../../components/Primitives/FoldText";
import WithdrawOptionsSlot from "../../../Slots/Cash/WithdrawOptionsSlot";
import InstantWithdrawFlow from "./InstantWithdrawFlow";
import OneTimeWithdrawFlow from "./OneTimeWithdrawFlow";
import { colorMaps } from "../../../../components/tokens";

type WithdrawType = "instant" | "oneTime" | null;

export interface WithdrawFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function WithdrawFlow({ onComplete, onClose }: WithdrawFlowProps) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [activeWithdrawType, setActiveWithdrawType] = useState<WithdrawType>(null);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleInstantPress = () => {
    setIsModalVisible(false);
    setActiveWithdrawType("instant");
  };

  const handleOneTimePress = () => {
    setIsModalVisible(false);
    setActiveWithdrawType("oneTime");
  };

  const handleSubFlowComplete = () => {
    setActiveWithdrawType(null);
    onComplete();
  };

  const handleSubFlowClose = () => {
    setActiveWithdrawType(null);
    onClose();
  };

  // Render active sub-flow
  if (activeWithdrawType === "instant") {
    return (
      <InstantWithdrawFlow
        onComplete={handleSubFlowComplete}
        onClose={handleSubFlowClose}
      />
    );
  }

  if (activeWithdrawType === "oneTime") {
    return (
      <OneTimeWithdrawFlow
        onComplete={handleSubFlowComplete}
        onClose={handleSubFlowClose}
      />
    );
  }

  // Withdraw options modal
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      onRequestClose={handleCloseModal}
    >
      <MiniModal
        variant="default"
        onClose={handleCloseModal}
        showHeader={false}
        footer={
          <ModalFooter
            type="default"
            disclaimer={
              <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                The Fold Card is issued by Sutton Bank, Member FDIC, pursuant to a...{" "}
                <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>
                  View more
                </FoldText>
              </FoldText>
            }
          />
        }
      >
        <WithdrawOptionsSlot
          onInstantPress={handleInstantPress}
          onOneTimePress={handleOneTimePress}
        />
      </MiniModal>
    </Modal>
  );
}
