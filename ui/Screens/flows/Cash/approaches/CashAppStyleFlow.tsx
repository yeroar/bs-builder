/**
 * Approach H: Cash App style
 *
 * Amount-first, recipient-second. Key patterns:
 * - Keypad is the first screen — enter amount before choosing recipient
 * - Recipient selection AFTER amount (reversed from most apps)
 * - One-tap Pay with no confirmation
 * - Minimal success screen
 *
 * Flow: [PaymentMethodModal] → Amount → Recipient → Success
 */
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface CashAppStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function CashAppStyleFlow({ assetType = "cash", onComplete, onClose }: CashAppStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(["amount"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("0");

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
  } = useAmountInput({ initialValue: "0" });

  const numAmount = parseFloat(amount) || 0;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
  };

  const handlePay = () => {
    setConfirmedAmount(amount);
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) onClose();
  };

  const handleDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    switch (step) {
      case "amount":
        return (
          <FullscreenTemplate
            title={config.title}
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            disableAnimation
          >
            <EnterAmount>
              <View style={styles.amountContent}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={<TopContext variant="empty" />}
                  bottomContextSlot={
                    <BottomContext
                      variant="paymentMethod"
                      paymentMethodVariant={selectedPaymentMethod}
                      paymentMethodBrand={selectedBrand}
                      paymentMethodLabel={selectedLabel}
                      onPaymentMethodPress={() => setIsModalVisible(true)}
                    />
                  }
                />
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Next" : `Next · ${config.formatAmount(numAmount)}`}
                actionDisabled={isEmpty}
                onActionPress={() => {
                  if (assetType === "cash") {
                    handlePay();
                  } else {
                    setFlowStack(prev => [...prev, "recipient"]);
                  }
                }}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "recipient":
        return (
          <RecipientStep
            assetType={assetType}
            navVariant="step"
            onContinue={(r) => {
              setRecipient(r);
              handlePay();
            }}
            onClose={() => setFlowStack(prev => prev.slice(0, -1))}
          />
        );
      default:
        return null;
    }
  };

  // Success
  if (showSuccess) {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    return (
      <FullscreenTemplate
        title="Sent"
        leftIcon="x"
        onLeftPress={handleDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button label="Done" hierarchy="inverse" size="md" onPress={handleDone} />
            }
          />
        }
      >
        <View style={styles.successContent}>
          <CheckCircleIcon width={56} height={56} color={colorMaps.face.primary} />
          <FoldText type="header-lg" style={styles.successAmount}>
            {config.formatAmount(numConfirmed)}
          </FoldText>
          {assetType !== "cash" && (
            <FoldText type="body-md" style={styles.successSubtext}>
              to {recipient || "recipient"}
            </FoldText>
          )}
        </View>
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
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
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
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["400"],
    paddingHorizontal: spacing["500"],
  },
  successAmount: {
    color: colorMaps.face.primary,
  },
  successSubtext: {
    color: colorMaps.face.secondary,
  },
});
