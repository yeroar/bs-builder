import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Animated, Dimensions, Modal } from "react-native";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import GiftCardConfirmationSlot from "../Templates/TxConfirmation/instances/GiftCardConfirmationSlot";
import SendAsAGiftSlot from "../Slots/GiftCard/SendAsAGiftSlot";
import GiftCardSuccessScreen from "../Templates/Success/instances/GiftCardSuccessScreen";
import ModalFooter from "../../components/modals/ModalFooter";
import MiniModal from "../../components/modals/MiniModal";
import Button from "../../components/Buttons/Button/Button";
import ChoosePaymentMethodFoldSlot, { FoldPaymentOption } from "../Slots/BTC/patterns/Payment Methods/ChoosePaymentMethodFoldSlot";
import { StarIcon } from "../../components/icons/StarIcon";
import FoldPressable from "../../components/Primitives/FoldPressable";
import { PmSelectorVariant } from "../../components/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../components/tokens";

const screenHeight = Dimensions.get("window").height;

export interface GiftCardConfirmationScreenProps {
  brand?: string;
  brandLabel?: string;
  amount?: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  purchaseAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  feeSatsEquivalent?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onFavorite?: () => void;
  onSendAsGift?: () => void;
  onRedeem?: () => void;
  onDone?: () => void;
  onViewDetails?: () => void;
}

export default function GiftCardConfirmationScreen({
  brand,
  brandLabel = "[Giftcard]",
  amount = "$20",
  satsEquivalent = "~₿0",
  bitcoinPrice = "$100,000.00",
  purchaseAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "$12.50",
  feeSatsEquivalent = "10,946 sats",
  onClose,
  onConfirm,
  onFavorite,
  onSendAsGift,
  onRedeem,
  onDone,
  onViewDetails,
}: GiftCardConfirmationScreenProps) {
  const [showSendAsGift, setShowSendAsGift] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnimatingToSuccess, setIsAnimatingToSuccess] = useState(false);

  // Payment method state
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("foldAccount");
  const [tempSelectedOption, setTempSelectedOption] = useState<FoldPaymentOption | undefined>();

  // Animation for yellow fill transition
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const animatedFillHeight = fillAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenHeight],
  });

  // Gift recipient state
  const [senderName, setSenderName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");

  // Get payment method label based on variant
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

  // Payment method modal handlers
  const handleOpenPaymentMethodModal = () => {
    setTempSelectedOption(undefined);
    setIsPaymentMethodModalVisible(true);
  };

  const handleClosePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  const handleConfirmPaymentMethod = () => {
    if (tempSelectedOption === "cashBalance") {
      setSelectedPaymentMethod("foldAccount");
    } else if (tempSelectedOption === "creditCard") {
      setSelectedPaymentMethod("cardAccount");
    }
    setIsPaymentMethodModalVisible(false);
  };

  const handleSendAsGiftPress = () => {
    setShowSendAsGift(true);
    onSendAsGift?.();
  };

  const handleCloseSendAsGift = () => {
    setShowSendAsGift(false);
  };

  const handleSendGift = () => {
    setShowSendAsGift(false);
  };

  const handleConfirmPurchase = () => {
    // Reset animation
    fillAnimation.setValue(0);

    // Start the transition animation
    setIsAnimatingToSuccess(true);

    // Animate the yellow fill from bottom to top
    Animated.timing(fillAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // After fill completes, show success screen
      setShowSuccess(true);
      setIsAnimatingToSuccess(false);
    });
  };

  const handleDone = () => {
    setShowSuccess(false);
    onDone?.();
  };

  return (
    <>
      <FullscreenTemplate
        title="Buy gift card"
        navVariant="step"
        leftIcon="chevron-left"
        onLeftPress={onClose}
        rightComponent={
          <FoldPressable onPress={onFavorite}>
            <StarIcon width={24} height={24} color={colorMaps.face.tertiary} />
          </FoldPressable>
        }
        scrollable={false}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <GiftCardConfirmationSlot
              brand={brand}
              brandLabel={brandLabel}
              amount={amount}
              satsEquivalent={satsEquivalent}
              bitcoinPrice={bitcoinPrice}
              purchaseAmount={purchaseAmount}
              feePercentage={feePercentage}
              feeAmount={feeAmount}
              feeSatsEquivalent={feeSatsEquivalent}
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodLabel={getPaymentMethodLabel()}
              onPaymentMethodPress={handleOpenPaymentMethodModal}
              onSendAsGiftPress={handleSendAsGiftPress}
              recipientName={recipientName}
              recipientPhone={recipientPhone}
            />
          </ScrollView>

          <ModalFooter
            type="default"
            primaryButton={
              <Button
                label="Confirm purchase"
                hierarchy="primary"
                size="lg"
                onPress={handleConfirmPurchase}
              />
            }
          />
        </View>
      </FullscreenTemplate>

      {/* Send as Gift Modal */}
      {showSendAsGift && (
        <FullscreenTemplate
          navVariant="start"
          leftIcon="x"
          onLeftPress={handleCloseSendAsGift}
          scrollable={false}
        >
          <SendAsAGiftSlot
            senderName={senderName}
            onSenderNameChange={setSenderName}
            recipientPhone={recipientPhone}
            onRecipientPhoneChange={setRecipientPhone}
            recipientName={recipientName}
            onRecipientNameChange={setRecipientName}
            giftMessage={giftMessage}
            onGiftMessageChange={setGiftMessage}
            onSendGift={handleSendGift}
          />
        </FullscreenTemplate>
      )}

      {/* Yellow fill animation overlay */}
      {isAnimatingToSuccess && (
        <Animated.View
          style={[
            styles.fillOverlay,
            {
              height: animatedFillHeight,
              backgroundColor: colorMaps.object.primary.bold.default,
            },
          ]}
          pointerEvents="none"
        />
      )}

      {/* Success Screen */}
      {showSuccess && (
        <GiftCardSuccessScreen
          brand={brand}
          brandLabel={brandLabel}
          amount={amount}
          onClose={handleDone}
          onFavorite={onFavorite}
          onViewDetails={onViewDetails}
          onRedeem={onRedeem}
          onDone={handleDone}
          animated={false}
        />
      )}

      {/* Payment Method Modal */}
      <Modal
        visible={isPaymentMethodModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleClosePaymentMethodModal}
      >
        <MiniModal
          variant="default"
          onClose={handleClosePaymentMethodModal}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Continue"
                  hierarchy="primary"
                  size="md"
                  disabled={!tempSelectedOption}
                  onPress={handleConfirmPaymentMethod}
                />
              }
            />
          }
        >
          <ChoosePaymentMethodFoldSlot
            selectedOption={tempSelectedOption}
            onSelectOption={setTempSelectedOption}
          />
        </MiniModal>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  fillOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 250,
  },
});
