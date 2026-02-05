import React, { useState } from "react";
import { Modal } from "react-native";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import { FoldText } from "../../../../components/Primitives/FoldText";
import OneTimeDepositSlot from "../../../Slots/Cash/OneTimeDepositSlot";
import InstantDepositFlow from "./InstantDepositFlow";
import OneTimeDepositFlow from "./OneTimeDepositFlow";
import RecurringDepositFlow from "./RecurringDepositFlow";
import { colorMaps } from "../../../../components/tokens";

type DepositType = "instant" | "oneTime" | "recurring" | null;

export interface DepositFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function DepositFlow({ onComplete, onClose }: DepositFlowProps) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [activeDepositType, setActiveDepositType] = useState<DepositType>(null);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleInstantPress = () => {
    setIsModalVisible(false);
    setActiveDepositType("instant");
  };

  const handleOneTimePress = () => {
    setIsModalVisible(false);
    setActiveDepositType("oneTime");
  };

  const handleRecurringPress = () => {
    setIsModalVisible(false);
    setActiveDepositType("recurring");
  };

  const handleSubFlowComplete = () => {
    setActiveDepositType(null);
    onComplete();
  };

  const handleSubFlowClose = () => {
    setActiveDepositType(null);
    onClose();
  };

  // Render active sub-flow
  if (activeDepositType === "instant") {
    return (
      <InstantDepositFlow
        onComplete={handleSubFlowComplete}
        onClose={handleSubFlowClose}
      />
    );
  }

  if (activeDepositType === "oneTime") {
    return (
      <OneTimeDepositFlow
        onComplete={handleSubFlowComplete}
        onClose={handleSubFlowClose}
      />
    );
  }

  if (activeDepositType === "recurring") {
    return (
      <RecurringDepositFlow
        frequency="Weekly"
        onComplete={handleSubFlowComplete}
        onClose={handleSubFlowClose}
      />
    );
  }

  // Deposit options modal
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
        <OneTimeDepositSlot
          onInstantPress={handleInstantPress}
          onOneTimePress={handleOneTimePress}
          onRecurringPress={handleRecurringPress}
        />
      </MiniModal>
    </Modal>
  );
}
