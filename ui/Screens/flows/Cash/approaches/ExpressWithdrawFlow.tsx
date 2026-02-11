/**
 * Approach A: Express Withdraw
 *
 * Inspired by: bunq (no confirmation), Revolut (speed-first)
 * Philosophy: Remove confirmation screen entirely. Inline fee preview
 * updates live as user types. Payment method is a chip, not a modal gate.
 *
 * Flow: [PaymentMethodModal] → EnterAmount (with inline receipt) → Success
 * Steps: 2 (down from 3)
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
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import InstantWithdrawSuccess from "../../../../Slots/Cash/InstantWithdrawSuccess";
import { formatWithCommas } from "../../../../../components/utils/formatWithCommas";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface ExpressWithdrawFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function ExpressWithdrawFlow({ assetType = "cash", onComplete, onClose }: ExpressWithdrawFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [flowStack, setFlowStack] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState("0");
  const [recipient, setRecipient] = useState("");

  // Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

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

  const numAmount = parseFloat(amount) || 0;
  const feeAmount = numAmount * config.feeRate;
  const totalAmount = numAmount + feeAmount;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setFlowStack(assetType === "cash" ? ["enterAmount"] : ["recipient"]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleWithdraw = () => {
    setConfirmedAmount(amount);
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleMaxPress = () => {
    setAmount("4900");
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
              setFlowStack(prev => [...prev, "enterAmount"]);
            }}
            onClose={() => setFlowStack([])}
          />
        );
      case "enterAmount":
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
                    label={isEmpty ? config.title : `${config.title.split(" ")[0]} ${config.formatAmount(numAmount)}`}
                    hierarchy="primary"
                    size="md"
                    disabled={isEmpty}
                    onPress={handleWithdraw}
                  />
                }
              />
            }
          >
            <EnterAmount>
              <View style={styles.content}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={
                    isEmpty ? (
                      <TopContext variant="empty" />
                    ) : (
                      <View style={styles.inlineFee}>
                        <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary }}>
                          {`Fee ${config.formatAmount(feeAmount)} · Total ${config.formatAmount(totalAmount)}`}
                        </FoldText>
                      </View>
                    )
                  }
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
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
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
        <InstantWithdrawSuccess amount={config.formatAmount(numConfirmed)} />
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
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
  inlineFee: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
