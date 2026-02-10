import React, { useState } from "react";
import { Modal, Keyboard, LayoutAnimation, Platform, UIManager } from "react-native";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import ActivateDebitCard from "./ActivateDebitCard";
import ActivationSuccess from "../ActivateCards/ActivationSuccess";
import { colorMaps } from "../../../components/tokens";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ActivateCardModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ActivateCardModal({ visible, onClose }: ActivateCardModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid = cardNumber.length > 0 && cvv.length > 0;

  const handleClose = () => {
    Keyboard.dismiss();
    setCardNumber("");
    setCVV("");
    setIsSuccess(false);
    onClose();
  };

  const handleActivate = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: LayoutAnimation.Types.spring, property: LayoutAnimation.Properties.opacity, springDamping: 0.7 },
        update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      });
      setIsSuccess(true);
    }, 150);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <MiniModal
        variant={isSuccess ? "default" : "keyboard"}
        onClose={handleClose}
        showHeader={false}
        footer={
          isSuccess ? (
            <ModalFooter
              primaryButton={<Button label="Done" hierarchy="primary" onPress={handleClose} />}
            />
          ) : (
            <ModalFooter
              disclaimer={
                <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                  Activate by phone: <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>1-833-904-2761</FoldText>
                </FoldText>
              }
              primaryButton={
                <Button label="Activate card" hierarchy="primary" disabled={!isFormValid} onPress={handleActivate} />
              }
            />
          )
        }
      >
        {isSuccess ? (
          <ActivationSuccess />
        ) : (
          <ActivateDebitCard
            cardNumber={cardNumber}
            cvv={cvv}
            onCardNumberChange={setCardNumber}
            onCVVChange={setCVV}
          />
        )}
      </MiniModal>
    </Modal>
  );
}
