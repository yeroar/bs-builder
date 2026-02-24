/**
 * Approach B: Bottom Sheet Confirm
 *
 * Inspired by: KakaoBank (bottom sheet confirmation overlay)
 * Philosophy: Keep amount screen visible. Overlay a mini-confirmation
 * as a bottom sheet. Reduces context-switching — user sees amount
 * behind the sheet the whole time.
 *
 * Flow: [PaymentMethodModal] → EnterAmount → BottomSheet(confirm) → Success
 * Steps: 2 screens (1 + overlay) — down from 3 full screens
 */
import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import InstantWithdrawEnterAmount from "../../../../Slots/Cash/InstantWithdrawEnterAmount";
import InstantWithdrawSuccess from "../../../../Slots/Cash/InstantWithdrawSuccess";
import MiniModal from "../../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { formatWithCommas } from "../../../../../components/utils/formatWithCommas";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface BottomSheetWithdrawFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function BottomSheetWithdrawFlow({ assetType = "cash", onComplete, onClose }: BottomSheetWithdrawFlowProps) {
  const config = getAssetConfig(assetType);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(assetType === "cash" ? ["enterAmount"] : ["recipient"]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState("");

  // Payment method (pre-populated default)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("visa");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

  const numAmount = parseFloat(flowAmount) || 0;
  const feeAmount = numAmount * config.feeRate;
  const totalAmount = numAmount + feeAmount;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsPaymentModalVisible(false);
  };

  const handleEnterAmountContinue = (amount: string) => {
    setFlowAmount(amount);
    setShowConfirmSheet(true);
  };

  const handleConfirmSheetCancel = () => {
    setShowConfirmSheet(false);
  };

  const handleConfirmSheetConfirm = () => {
    setShowConfirmSheet(false);
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

  // Payment method display label for the confirm sheet
  const paymentLabel = selectedLabel || "Debit card";

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
          >
            <InstantWithdrawEnterAmount
              maxAmount="$4,900.00"
              actionLabel="Continue"
              onActionPress={handleEnterAmountContinue}
            />
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

      {/* Payment Method Selection */}
      <ChoosePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onSelect={handlePaymentMethodSelect}
        type="debitCard"
      />

      {/* KakaoBank-style Bottom Sheet Confirmation */}
      <Modal
        visible={showConfirmSheet}
        transparent
        animationType="none"
        onRequestClose={handleConfirmSheetCancel}
      >
        <MiniModal
          variant="default"
          onClose={handleConfirmSheetCancel}
          showHeader={false}
          footer={
            <ModalFooter
              variant="sideBySide"
              secondaryButton={
                <Button
                  label="Cancel"
                  hierarchy="secondary"
                  size="md"
                  onPress={handleConfirmSheetCancel}
                />
              }
              primaryButton={
                <Button
                  label="Confirm"
                  hierarchy="primary"
                  size="md"
                  onPress={handleConfirmSheetConfirm}
                />
              }
            />
          }
        >
          <View style={styles.sheetContent}>
            <FoldText type="header-sm" style={styles.sheetTitle}>
              {`${config.title.split(" ")[0]} ${config.formatAmount(numAmount)}?`}
            </FoldText>

            <ReceiptDetails>
              <ListItemReceipt label="To" value={paymentLabel} />
              <ListItemReceipt label={`Fee · ${config.feeLabel}`} value={config.formatAmount(feeAmount)} />
              <ListItemReceipt label="Total" value={config.formatAmount(totalAmount)} />
            </ReceiptDetails>
          </View>
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
  sheetContent: {
    gap: spacing["400"],
  },
  sheetTitle: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
});
