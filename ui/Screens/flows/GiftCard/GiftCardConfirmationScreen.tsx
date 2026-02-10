import React, { useState } from "react";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import GiftCardConfirmation from "../../../Slots/GiftCard/GiftCardConfirmation";
import SendAsAGift from "../../../Slots/GiftCard/SendAsAGift";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import FoldPressable from "../../../../components/Primitives/FoldPressable";
import { StarIcon } from "../../../../components/Icons/StarIcon";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { colorMaps } from "../../../../components/tokens";
import { SelectedCard } from "./GiftCardPurchaseFlow";

export interface GiftCardConfirmationScreenProps {
  card: SelectedCard;
  amount: string;
  purchaseAmount: string;
  feeAmount: string;
  onBack: () => void;
  onConfirm: () => void;
}

export default function GiftCardConfirmationScreen({
  card,
  amount,
  purchaseAmount,
  feeAmount,
  onBack,
  onConfirm,
}: GiftCardConfirmationScreenProps) {
  // Payment method state
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("foldAccount");

  // Send-as-gift state
  const [showSendAsGift, setShowSendAsGift] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");

  const getPaymentMethodLabel = (): string => {
    switch (selectedPaymentMethod) {
      case "foldAccount":
        return "Cash balance";
      case "cardAccount":
        return "Credit Card •••• 0823";
      default:
        return "";
    }
  };

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setIsPaymentMethodModalVisible(false);
  };

  return (
    <>
      <FullscreenTemplate
        title="Buy gift card"
        navVariant="step"
        leftIcon="chevron-left"
        onLeftPress={onBack}
        rightComponent={
          <FoldPressable onPress={() => console.log("Favorite")}>
            <StarIcon width={24} height={24} color={colorMaps.face.tertiary} />
          </FoldPressable>
        }
        scrollable={false}
        disableAnimation
        footer={
          <ModalFooter
            type="default"
            primaryButton={
              <Button
                label="Confirm purchase"
                hierarchy="primary"
                size="lg"
                onPress={onConfirm}
              />
            }
          />
        }
      >
        <GiftCardConfirmation
          brand={card.brand}
          brandLabel={card.title}
          amount={amount}
          purchaseAmount={purchaseAmount}
          feeAmount={feeAmount}
          paymentMethodVariant={selectedPaymentMethod}
          paymentMethodLabel={getPaymentMethodLabel()}
          onPaymentMethodPress={() => setIsPaymentMethodModalVisible(true)}
          onSendAsGiftPress={() => setShowSendAsGift(true)}
          recipientName={recipientName}
          recipientPhone={recipientPhone}
        />
      </FullscreenTemplate>

      {/* Send as Gift overlay */}
      {showSendAsGift && (
        <FullscreenTemplate
          navVariant="start"
          leftIcon="x"
          onLeftPress={() => setShowSendAsGift(false)}
          scrollable={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Send gift"
                  hierarchy="primary"
                  size="lg"
                  onPress={() => setShowSendAsGift(false)}
                  disabled={!(senderName.trim() !== "" && recipientPhone.trim() !== "" && recipientName.trim() !== "")}
                />
              }
            />
          }
        >
          <SendAsAGift
            senderName={senderName}
            onSenderNameChange={setSenderName}
            recipientPhone={recipientPhone}
            onRecipientPhoneChange={setRecipientPhone}
            recipientName={recipientName}
            onRecipientNameChange={setRecipientName}
            giftMessage={giftMessage}
            onGiftMessageChange={setGiftMessage}
          />
        </FullscreenTemplate>
      )}

      <ChoosePaymentMethodModal
        visible={isPaymentMethodModalVisible}
        onClose={() => setIsPaymentMethodModalVisible(false)}
        onSelect={handlePaymentMethodSelect}
        type="foldPayment"
      />
    </>
  );
}
