import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Animated, Dimensions } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import GiftCardConfirmation from "../../../Slots/GiftCard/GiftCardConfirmation";
import SendAsAGift from "../../../Slots/GiftCard/SendAsAGift";
import GiftCardSuccess from "../../../Slots/GiftCard/GiftCardSuccess";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import { StarIcon } from "../../../../components/Icons/StarIcon";
import FoldPressable from "../../../../components/Primitives/FoldPressable";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../../../components/tokens";

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
  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
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
            <GiftCardConfirmation
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
              onPaymentMethodPress={() => setIsPaymentMethodModalVisible(true)}
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
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Send gift"
                  hierarchy="primary"
                  size="lg"
                  onPress={handleSendGift}
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
        <GiftCardSuccess
          brand={brand}
          brandLabel={brandLabel}
          amount={amount}
          onClose={handleDone}
          onFavorite={onFavorite}
          onViewDetails={onViewDetails}
          animated={false}
          footer={
            <ModalFooter
              type="inverse"
              primaryButton={
                <Button
                  label="Redeem"
                  hierarchy="inverse"
                  size="md"
                  onPress={onRedeem}
                />
              }
              secondaryButton={
                <Button
                  label="Done"
                  hierarchy="secondary"
                  size="md"
                  onPress={handleDone}
                />
              }
            />
          }
        />
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
