import React, { useState } from "react";
import { View, StyleSheet, Modal, Keyboard, LayoutAnimation, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import MiniModal from "../../components/modals/MiniModal";
import ModalFooter from "../../components/modals/ModalFooter";
import Button from "../../components/Buttons/Button/Button";
import ActivateDebitCardSlot from "../Slots/ActivateDebitCardSlot";
import ActivationSuccessSlot from "../Slots/ActivationSuccessSlot";

export default function ActivateCardModalExample() {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [visible, setVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const isFormValid = cardNumber.length > 0 && cvv.length > 0;

  const handleActivate = () => {
    console.log("Activating card:", { cardNumber, cvv });
    console.log("[ActivateCardModalExample] Switching to success state");
    Keyboard.dismiss();
    // Small delay to let keyboard dismiss smoothly before showing success
    setTimeout(() => {
      // Configure spring animation for smooth layout transition
      LayoutAnimation.configureNext({
        duration: 400,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 0.7,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.7,
        },
      });
      setIsSuccess(true);
    }, 150);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleDone = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setVisible(false);
    }, 50);
  };

  const modalVariant = isSuccess ? "default" : "keyboard";
  console.log("[ActivateCardModalExample] Rendering - isSuccess:", isSuccess, "modalVariant:", modalVariant);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <MiniModal
          variant={modalVariant}
          showHeader={false}
          footer={
            isSuccess ? (
              <ModalFooter
                variant="stacked"
                primaryButton={
                  <Button
                    label="Done"
                    hierarchy="primary"
                    size="md"
                    onPress={handleDone}
                  />
                }
              />
            ) : (
              <ModalFooter
                variant="stacked"
                disclaimer="Activate by phone: 1-833-904-2761"
                primaryButton={
                  <Button
                    label="Activate card v2"
                    hierarchy="primary"
                    size="md"
                    disabled={!isFormValid}
                    onPress={handleActivate}
                  />
                }
              />
            )
          }
        >
          {isSuccess ? (
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
});
