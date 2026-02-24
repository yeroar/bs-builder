/**
 * Approach C: Progressive Reveal
 *
 * Inspired by: Wise (transfer summary), Coinbase (review screen)
 * Philosophy: Single scrollable screen. Amount input at top, receipt
 * details progressively reveal as user enters an amount. Confirmation
 * IS the same screen — just scroll down.
 *
 * Flow: [PaymentMethodModal] → SingleScreen(amount + receipt) → Success
 * Steps: 1 screen (down from 3)
 */
import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Animated as RNAnimated } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import InstantWithdrawSuccess from "../../../../Slots/Cash/InstantWithdrawSuccess";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { formatWithCommas } from "../../../../../components/utils/formatWithCommas";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface ProgressiveWithdrawFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function ProgressiveWithdrawFlow({ assetType = "cash", onComplete, onClose }: ProgressiveWithdrawFlowProps) {
  const config = getAssetConfig(assetType);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(assetType === "cash" ? ["progressive"] : ["recipient"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState("");

  // Payment method (pre-populated default)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("visa");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

  // Amount input
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
    setAmount,
  } = useAmountInput({ initialValue: "0" });

  // Receipt reveal animation
  const receiptOpacity = useRef(new RNAnimated.Value(0)).current;
  const prevEmpty = useRef(true);

  const numAmount = parseFloat(amount) || 0;
  const feeAmount = numAmount * config.feeRate;
  const totalAmount = numAmount + feeAmount;

  // Animate receipt in/out when amount changes
  if (!isEmpty && prevEmpty.current) {
    RNAnimated.timing(receiptOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    prevEmpty.current = false;
  } else if (isEmpty && !prevEmpty.current) {
    RNAnimated.timing(receiptOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
    prevEmpty.current = true;
  }

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsPaymentModalVisible(false);
  };

  const handleConfirmWithdraw = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) onClose();
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    switch (step) {
      case "recipient":
        return (
          <RecipientStep
            assetType={assetType}
            navVariant="start"
            onContinue={(r) => {
              setRecipient(r);
              setFlowStack(prev => [...prev, "progressive"]);
            }}
            onClose={() => setFlowStack([])}
          />
        );
      case "progressive":
        return (
          <FullscreenTemplate
            title={config.title}
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable={false}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Confirm withdrawal"
                    hierarchy="primary"
                    size="md"
                    disabled={isEmpty}
                    onPress={handleConfirmWithdraw}
                  />
                }
              />
            }
          >
            <View style={styles.screenContainer}>
              {/* Top: Amount Input */}
              <View style={styles.amountSection}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={<TopContext variant="empty" />}
                  bottomContextSlot={
                    <BottomContext
                      variant="paymentMethod"
                      paymentMethodVariant={selectedPaymentMethod}
                      paymentMethodBrand={selectedBrand}
                      paymentMethodLabel={selectedLabel}
                      onPaymentMethodPress={() => setIsPaymentModalVisible(true)}
                    />
                  }
                />
              </View>

              {/* Middle: Progressive Receipt (reveals when amount > 0) */}
              <RNAnimated.View style={[styles.receiptSection, { opacity: receiptOpacity }]}>
                <Divider />
                <ReceiptDetails>
                  <ListItemReceipt label="Transfer" value={config.formatAmount(numAmount)} />
                  <ListItemReceipt label={`Fees · ${config.feeLabel}`} value={config.formatAmount(feeAmount)} />
                  <ListItemReceipt label="Total" value={config.formatAmount(totalAmount)} />
                </ReceiptDetails>
                <View style={styles.disclaimer}>
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    Withdrawals limited to $15,000 per transfer.
                  </FoldText>
                </View>
              </RNAnimated.View>

              {/* Bottom: Keypad */}
              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
              />
            </View>
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <FullscreenTemplate
        title={config.successTitle}
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button label="Done" hierarchy="inverse" size="md" onPress={handleSuccessDone} />
            }
          />
        }
      >
        <InstantWithdrawSuccess amount={config.formatAmount(numAmount)} />
      </FullscreenTemplate>
    );
  }

  return (
    <>
      {flowStack.length > 0 && (
        <View style={styles.container}>
          <ScreenStack
            stack={flowStack}
            renderScreen={renderScreen}
            animateInitial
            onEmpty={handleFlowEmpty}
          />
        </View>
      )}

      <ChoosePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onSelect={handlePaymentMethodSelect}
        type="debitCard"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  amountSection: {
    paddingHorizontal: spacing["400"],
  },
  receiptSection: {
    paddingHorizontal: spacing["400"],
    gap: spacing["200"],
  },
  disclaimer: {
    paddingTop: spacing["200"],
  },
});
