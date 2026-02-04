import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import ScreenStack from "../../Templates/ScreenStack";
import BtcBuyEnterAmount from "../../Templates/EnterAmount/instances/BTC/BtcBuyEnterAmount";
import BtcConfirmBuySlot from "../../Templates/TxConfirmation/instances/BTC/BtcConfirmBuySlot";
import { CurrencyInput } from "../../../components/CurrencyInput";
import MiniModal from "../../../components/modals/MiniModal";
import ModalFooter from "../../../components/modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import AddPaymentSlot from "../../Slots/BTC/patterns/PaymentMethods/AddPaymentSlot";
import ChooseBankAccountSlot from "../../Slots/BTC/patterns/PaymentMethods/ChooseBankAccountSlot";
import ChooseDebitCardSlot from "../../Slots/BTC/patterns/PaymentMethods/ChooseDebitCardSlot";
import { PmSelectorVariant } from "../../../components/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../../components/tokens";

type FlowStep = "enterAmount" | "confirm";
type ModalStep = "initial" | "bankAccount" | "debitCard";

export interface BtcBuyFlowProps {
  /** Initial amount if pre-selected (e.g., "$50") */
  initialAmount?: string;
  onComplete: () => void;
  onClose: () => void;
}

const BTC_PRICE_USD = 102500;

export default function BtcBuyFlow({ initialAmount, onComplete, onClose }: BtcBuyFlowProps) {
  // Flow state
  const [flowStack, setFlowStack] = useState<FlowStep[]>(() => {
    // If initial amount provided, skip to confirm
    if (initialAmount && initialAmount !== "custom") {
      return ["confirm"];
    }
    return ["enterAmount"];
  });
  const [flowAmount, setFlowAmount] = useState(() => {
    if (initialAmount && initialAmount !== "custom") {
      return initialAmount.replace("$", "");
    }
    return "0";
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>("initial");
  const [tempSelectedBankId, setTempSelectedBankId] = useState<string | undefined>();
  const [tempSelectedBankBrand, setTempSelectedBankBrand] = useState<string | undefined>();
  const [tempSelectedCardId, setTempSelectedCardId] = useState<string | undefined>();
  const [tempSelectedCardBrand, setTempSelectedCardBrand] = useState<string | undefined>();

  const formatWithCommas = (num: number, decimals = 2): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split(".");
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedInt}.${decPart}`;
  };

  const formatSats = (sats: number): string => {
    const formatted = String(Math.round(sats)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `~${formatted} sats`;
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

  // Payment method modal handlers
  const handleOpenPaymentModal = () => {
    setModalStep("initial");
    setTempSelectedBankId(undefined);
    setTempSelectedCardId(undefined);
    setIsPaymentModalVisible(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalVisible(false);
  };

  const handleSelectBankAccountType = () => {
    setModalStep("bankAccount");
  };

  const handleSelectDebitCardType = () => {
    setModalStep("debitCard");
  };

  const handleConfirmPaymentSelection = () => {
    if (modalStep === "bankAccount" && tempSelectedBankId) {
      setSelectedPaymentMethod("bankAccount");
      setSelectedBrand(tempSelectedBankBrand);
      setIsPaymentModalVisible(false);
    } else if (modalStep === "debitCard" && tempSelectedCardId) {
      setSelectedPaymentMethod("cardAccount");
      setSelectedBrand(tempSelectedCardBrand);
      setIsPaymentModalVisible(false);
    }
  };

  const hasPaymentSelection = () => {
    if (modalStep === "bankAccount") return !!tempSelectedBankId;
    if (modalStep === "debitCard") return !!tempSelectedCardId;
    return false;
  };

  const renderPaymentModalContent = () => {
    switch (modalStep) {
      case "bankAccount":
        return (
          <ChooseBankAccountSlot
            selectedAccountId={tempSelectedBankId}
            onSelectAccount={(account) => {
              setTempSelectedBankId(account.id);
              setTempSelectedBankBrand(account.brand);
            }}
            onAddBankAccount={handleClosePaymentModal}
          />
        );
      case "debitCard":
        return (
          <ChooseDebitCardSlot
            selectedCardId={tempSelectedCardId}
            onSelectCard={(card) => {
              setTempSelectedCardId(card.id);
              setTempSelectedCardBrand(card.brand);
            }}
            onAddDebitCard={handleClosePaymentModal}
          />
        );
      default:
        return (
          <AddPaymentSlot
            onBankAccountPress={handleSelectBankAccountType}
            onDebitCardPress={handleSelectDebitCardType}
          />
        );
    }
  };

  const renderPaymentModalFooter = () => {
    if (modalStep === "initial") {
      return <ModalFooter type="clean" />;
    }
    return (
      <ModalFooter
        type="default"
        primaryButton={
          <Button
            label="Continue"
            hierarchy="primary"
            size="md"
            disabled={!hasPaymentSelection()}
            onPress={handleConfirmPaymentSelection}
          />
        }
      />
    );
  };

  const renderScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const feeAmount = numAmount * 0.01;
    const netAmount = numAmount - feeAmount;
    const satsEquivalent = Math.round(numAmount * 100);

    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title="Buy bitcoin"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcBuyEnterAmount
              maxAmount="$500.00"
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Confirm purchase"
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <BtcConfirmBuySlot
              amount={`$${formatWithCommas(numAmount)}`}
              satsEquivalent={formatSats(satsEquivalent)}
              bitcoinPrice="$100,000.00"
              purchaseAmount={`$${formatWithCommas(netAmount)}`}
              feePercentage="1%"
              feeAmount={`+$${formatWithCommas(feeAmount)}`}
              actionLabel="Confirm purchase"
              paymentMethodVariant={selectedPaymentMethod}
              paymentMethodBrand={selectedBrand}
              onPaymentMethodPress={handleOpenPaymentModal}
              onConfirmPress={handleConfirm}
            />
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    const numAmount = parseFloat(flowAmount) || 0;
    const satsEquivalent = Math.round(numAmount * 100);

    return (
      <FullscreenTemplate
        title="Purchase submitted"
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
      >
        <View style={styles.successContent}>
          <CurrencyInput
            value={`$${parseFloat(flowAmount).toFixed(2)}`}
            topContextVariant="btc"
            topContextValue={`~${satsEquivalent.toLocaleString()} sats`}
            bottomContextVariant="none"
          />
        </View>
        <ModalFooter
          type="inverse"
          disclaimer={
            <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
              Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
              <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
                up to 14 days
              </FoldText>
              {" "}from purchase to unlock.
            </FoldText>
          }
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
      <View style={styles.container}>
        <ScreenStack
          stack={flowStack}
          renderScreen={renderScreen}
          animateInitial
          onEmpty={handleFlowEmpty}
        />
      </View>

      <Modal
        visible={isPaymentModalVisible}
        transparent
        animationType="none"
        onRequestClose={handleClosePaymentModal}
      >
        <MiniModal
          variant="default"
          onClose={handleClosePaymentModal}
          showHeader={false}
          footer={renderPaymentModalFooter()}
        >
          {renderPaymentModalContent()}
        </MiniModal>
      </Modal>
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
  successContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
