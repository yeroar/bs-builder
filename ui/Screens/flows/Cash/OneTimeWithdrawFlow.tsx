import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import TxConfirmation from "../../../Templates/TxConfirmation/TxConfirmation";
import EnterAmount from "../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../Templates/EnterAmount/useAmountInput";
import OneTimeWithdrawSuccess from "../../../Slots/Cash/OneTimeWithdrawSuccess";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { Keypad } from "../../../../components/Keypad";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../Slots/Modals/ChoosePaymentMethodModal";
import { colorMaps, spacing } from "../../../../components/tokens";
import { formatWithCommas } from "../../../../components/utils/formatWithCommas";

type FlowStep = "enterAmount" | "confirm";

export interface OneTimeWithdrawFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function OneTimeWithdrawFlow({ onComplete, onClose }: OneTimeWithdrawFlowProps) {
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>([]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setFlowStack(["enterAmount"]);
  };

  // Flow handlers
  const handleEnterAmountContinue = (amount: string) => {
    setFlowAmount(amount);
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleConfirmBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="One-time withdrawal"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <OneTimeWithdrawEnterAmount
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="One-time withdrawal"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <TxConfirmation
              currencyInput={
                <CurrencyInput
                  value={`$${formatWithCommas(numAmount)}`}
                  topContextVariant="empty"
                  bottomContextVariant="paymentMethod"
                  paymentMethodVariant={selectedPaymentMethod}
                  paymentMethodBrand={selectedBrand}
                  paymentMethodLabel={selectedLabel}
                  onPaymentMethodPress={() => setIsModalVisible(true)}
                />
              }
              receiptDetails={
                <ReceiptDetails>
                  <ListItemReceipt label="Transfer" value={`$${formatWithCommas(numAmount)}`} />
                  <ListItemReceipt label="Total" value={`$${formatWithCommas(numAmount)}`} />
                </ReceiptDetails>
              }
              disclaimer="Withdrawals are limited to $15,000 per transfer, $150,000 per day, $50,000 per month."
              footer={
                <ModalFooter
                  type="default"
                  disclaimer={
                    <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                      Your withdrawal may take 1-5 business days to complete.
                    </FoldText>
                  }
                  primaryButton={
                    <Button
                      label="Confirm withdrawal"
                      hierarchy="primary"
                      size="md"
                      disabled={selectedPaymentMethod === "null"}
                      onPress={handleConfirm}
                    />
                  }
                />
              }
            />
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  // Success screen
  if (showSuccess) {
    const numAmount = parseFloat(flowAmount) || 0;

    return (
      <FullscreenTemplate
        title="Withdrawal initiated"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <OneTimeWithdrawSuccess
          amount={`$${formatWithCommas(numAmount)}`}
          onDone={handleSuccessDone}
        />
      </FullscreenTemplate>
    );
  }

  return (
    <>
      {/* Flow screens */}
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
        type="bankAccount"
      />
    </>
  );
}

// Inline enter amount component (mirrors OneTimeDepositEnterAmount pattern)
function OneTimeWithdrawEnterAmount({
  initialValue = "0",
  actionLabel = "Continue",
  onActionPress,
}: {
  initialValue?: string;
  actionLabel?: string;
  onActionPress?: (amount: string) => void;
}) {
  const {
    amount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
  } = useAmountInput({ initialValue });

  const handleActionPress = () => {
    onActionPress?.(amount);
  };

  return (
    <EnterAmount>
      <View style={styles.enterAmountContent}>
        <CurrencyInput
          value={formatDisplayValue(amount)}
          topContextSlot={
            <TopContext variant="empty" />
          }
          bottomContextSlot={
            <BottomContext variant="empty" />
          }
        />
      </View>

      <Keypad
        onNumberPress={handleNumberPress}
        onDecimalPress={handleDecimalPress}
        onBackspacePress={handleBackspacePress}
        disableDecimal={hasDecimal}
        actionBar
        actionLabel={actionLabel}
        actionDisabled={isEmpty}
        onActionPress={handleActionPress}
      />
    </EnterAmount>
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
  enterAmountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
});
