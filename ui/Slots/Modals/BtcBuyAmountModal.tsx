import React, { useState } from "react";
import { Modal } from "react-native";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import BtcBuyModal, { BuyAmount } from "../BTC/BtcBuyModal";

export interface BtcBuyAmountModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue: (amount: BuyAmount) => void;
}

export default function BtcBuyAmountModal({ visible, onClose, onContinue }: BtcBuyAmountModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<BuyAmount>(null);

  const handleClose = () => {
    setSelectedAmount(null);
    onClose();
  };

  const handleContinue = () => {
    onContinue(selectedAmount);
    setSelectedAmount(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <MiniModal
        variant="default"
        onClose={handleClose}
        showHeader={false}
        footer={
          <ModalFooter
            primaryButton={
              <Button
                label="Continue"
                hierarchy="primary"
                disabled={selectedAmount === null}
                onPress={handleContinue}
              />
            }
          />
        }
      >
        <BtcBuyModal
          selectedAmount={selectedAmount}
          onSelectAmount={setSelectedAmount}
        />
      </MiniModal>
    </Modal>
  );
}
