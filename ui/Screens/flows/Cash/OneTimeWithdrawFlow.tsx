import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../Templates/ScreenStack";
import TxConfirmation from "../../../Templates/TxConfirmation/TxConfirmation";
import EnterAmount from "../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/Inputs/CurrencyInput/PmSelector";
import { Keypad } from "../../../../components/Keypad";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import MiniModal from "../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ChooseBankAccountSlot from "../../../Slots/Shared/PaymentMethods/ChooseBankAccountSlot";
import { colorMaps, spacing } from "../../../../components/tokens";

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
  const [tempSelectedBankId, setTempSelectedBankId] = useState<string | undefined>();
  const [tempSelectedBankBrand, setTempSelectedBankBrand] = useState<string | undefined>();
  const [tempSelectedBankLabel, setTempSelectedBankLabel] = useState<string | undefined>();

  const formatWithCommas = (num: number, decimals = 2): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  };

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleConfirmBankSelection = () => {
    if (tempSelectedBankId) {
      setSelectedPaymentMethod("bankAccount");
      setSelectedBrand(tempSelectedBankBrand);
      setSelectedLabel(tempSelectedBankLabel);
      setIsModalVisible(false);
      setFlowStack(["enterAmount"]);
    }
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

  // Re-open payment method modal
  const handleOpenPaymentModal = () => {
    setIsModalVisible(true);
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
                  onPaymentMethodPress={handleOpenPaymentModal}
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
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${formatWithCommas(numAmount)}`}
            topContextVariant="empty"
            bottomContextVariant="empty"
          />
        </View>
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button
              label="Done"
              hierarchy="inverse"
              size="md"
              onPress={handleSuccessDone}
            />
          }
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

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <MiniModal
          variant="default"
          onClose={handleCloseModal}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button
                  label="Continue"
                  hierarchy="primary"
                  size="md"
                  disabled={!tempSelectedBankId}
                  onPress={handleConfirmBankSelection}
                />
              }
            />
          }
        >
          <ChooseBankAccountSlot
            selectedAccountId={tempSelectedBankId}
            onSelectAccount={(account) => {
              setTempSelectedBankId(account.id);
              setTempSelectedBankBrand(account.brand);
              setTempSelectedBankLabel(`${account.name} \u2022\u2022\u2022\u2022 ${account.lastFour}`);
            }}
            onAddBankAccount={handleCloseModal}
          />
        </MiniModal>
      </Modal>
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
  successContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
  enterAmountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
  },
});
