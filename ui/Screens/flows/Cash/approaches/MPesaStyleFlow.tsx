/**
 * Approach K: M-Pesa/Chipper style
 *
 * Ultra-minimal payment. Key patterns:
 * - Phone number input as recipient
 * - Amount entry with keypad
 * - PIN pad confirmation (no review screen)
 * - Instant success — 3 taps to done
 *
 * Flow: [PaymentMethodModal] → Phone → Amount → PIN → Success
 */
import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import TextField from "../../../../../components/Inputs/TextContainer/TextField";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface MPesaStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

const PIN_LENGTH = 4;

export default function MPesaStyleFlow({ assetType = "cash", onComplete, onClose }: MPesaStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [flowStack, setFlowStack] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("0");
  const [pin, setPin] = useState("");

  // Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  // Amount
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
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setFlowStack(assetType === "cash" ? ["amount"] : ["phone"]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handlePinDigit = (digit: string) => {
    if (pin.length < PIN_LENGTH) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === PIN_LENGTH) {
        // Auto-submit on last digit
        setTimeout(() => {
          setFlowStack([]);
          setShowSuccess(true);
        }, 300);
      }
    }
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
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
      case "phone":
        return (
          <FullscreenTemplate
            title="Send money"
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            disableAnimation
            keyboardAware
            footer={
              <ModalFooter
                type="default"
                modalVariant="keyboard"
                primaryButton={
                  <Button
                    label="Continue"
                    hierarchy="primary"
                    size="md"
                    disabled={phone.trim().length < 7}
                    onPress={() => setFlowStack(prev => [...prev, "amount"])}
                  />
                }
              />
            }
          >
            <View style={styles.phoneContent}>
              <FoldText type="header-sm" style={styles.phoneTitle}>
                Phone number
              </FoldText>
              <TextField
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </FullscreenTemplate>
        );
      case "amount":
        return (
          <FullscreenTemplate
            title={config.title}
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <EnterAmount>
              <View style={styles.amountContent}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={<TopContext variant="empty" />}
                  bottomContextSlot={<BottomContext variant="empty" />}
                />
                {assetType !== "cash" && (
                  <FoldText type="body-sm" style={styles.recipientLabel}>
                    To: {phone}
                  </FoldText>
                )}
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Send" : `Send ${config.formatAmount(numAmount)}`}
                actionDisabled={isEmpty}
                onActionPress={() => {
                  setConfirmedAmount(amount);
                  setPin("");
                  setFlowStack(prev => [...prev, "pin"]);
                }}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "pin":
        return (
          <FullscreenTemplate
            title="Enter PIN"
            onLeftPress={() => {
              setPin("");
              setFlowStack(prev => prev.slice(0, -1));
            }}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <View style={styles.pinContent}>
              <FoldText type="body-md" style={styles.pinSubtext}>
                {assetType === "cash"
                  ? `Confirm ${config.formatAmount(parseFloat(confirmedAmount) || 0)}`
                  : `Confirm ${config.formatAmount(parseFloat(confirmedAmount) || 0)} to ${phone}`}
              </FoldText>

              {/* PIN dots */}
              <View style={styles.pinDots}>
                {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                  <View
                    key={i}
                    style={[styles.pinDot, i < pin.length && styles.pinDotFilled]}
                  />
                ))}
              </View>
            </View>

            {/* PIN keypad */}
            <Keypad
              onNumberPress={(n) => handlePinDigit(String(n))}
              onDecimalPress={() => {}}
              onBackspacePress={handlePinBackspace}
              disableDecimal
            />
          </FullscreenTemplate>
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
              Sent to {phone}
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
        onClose={handleCloseModal}
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
  phoneContent: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  phoneTitle: {
    color: colorMaps.face.primary,
  },
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    alignItems: "center",
    gap: spacing["200"],
  },
  recipientLabel: {
    color: colorMaps.face.tertiary,
  },
  pinContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["600"],
    paddingHorizontal: spacing["500"],
  },
  pinSubtext: {
    color: colorMaps.face.secondary,
    textAlign: "center",
  },
  pinDots: {
    flexDirection: "row",
    gap: spacing["400"],
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colorMaps.border.secondary,
  },
  pinDotFilled: {
    backgroundColor: colorMaps.face.primary,
    borderColor: colorMaps.face.primary,
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
