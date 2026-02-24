/**
 * Approach I: Strike/Lightning style
 *
 * Invoice-driven payment. Key patterns:
 * - Scan QR / paste invoice or address as entry
 * - Amount pre-filled from invoice (editable for on-chain)
 * - Simple confirm screen with fee estimate
 * - Success with network broadcast status
 *
 * Flow: [PaymentMethodModal] → Scan/Paste → Amount (pre-filled) → Confirm → Success
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
import TextField from "../../../../../components/Inputs/TextContainer/TextField";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface StrikeStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function StrikeStyleFlow({ assetType = "cash", onComplete, onClose }: StrikeStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(assetType === "cash" ? ["amount"] : ["address"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceAddress, setInvoiceAddress] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Payment method (pre-populated default)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

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
  const feeAmount = numAmount * config.feeRate;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
  };

  const handleSend = () => {
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
      case "address":
        return (
          <FullscreenTemplate
            title="Send"
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
                    disabled={invoiceAddress.trim().length < 3}
                    onPress={() => setFlowStack(prev => [...prev, "amount"])}
                  />
                }
              />
            }
          >
            <View style={styles.addressContent}>
              <FoldText type="header-sm" style={styles.addressTitle}>
                {assetType === "bitcoin" ? "Invoice or address" : "Recipient"}
              </FoldText>
              <TextField
                placeholder={assetType === "bitcoin" ? "Paste invoice, address, or LNURL" : "Email, phone, or username"}
                value={invoiceAddress}
                onChangeText={setInvoiceAddress}
                multiline
              />
              <View style={styles.addressActions}>
                <Button label="Paste" hierarchy="secondary" size="sm" onPress={() => setInvoiceAddress("lnbc50u1p...mock")} />
                <Button label="Scan QR" hierarchy="secondary" size="sm" onPress={() => setInvoiceAddress("bc1qmock...addr")} />
              </View>
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
                  <FoldText type="body-sm" style={styles.addressPreview} numberOfLines={1}>
                    To: {invoiceAddress.slice(0, 24)}...
                  </FoldText>
                )}
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Review" : `Review · ${config.formatAmount(numAmount)}`}
                actionDisabled={isEmpty}
                onActionPress={() => setFlowStack(prev => [...prev, "confirm"])}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title="Confirm"
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button label={`Send ${config.formatAmount(numAmount)}`} hierarchy="primary" size="md" onPress={handleSend} />
                }
              />
            }
          >
            <View style={styles.confirmContent}>
              <View style={styles.confirmHeader}>
                <FoldText type="header-lg" style={styles.confirmAmount}>
                  {config.formatAmount(numAmount)}
                </FoldText>
                {assetType !== "cash" && (
                  <FoldText type="body-sm" style={styles.addressPreview} numberOfLines={1}>
                    {invoiceAddress.slice(0, 30)}...
                  </FoldText>
                )}
              </View>

              <Divider />

              <ReceiptDetails>
                <ListItemReceipt label="Amount" value={config.formatAmount(numAmount)} />
                <ListItemReceipt label={`Network fee · ${config.feeLabel}`} value={config.formatAmount(feeAmount)} />
                <ListItemReceipt label="From" value={selectedLabel || "Account"} />
                <ListItemReceipt label="Speed" value={assetType === "bitcoin" ? "~10 min" : "Instant"} />
              </ReceiptDetails>
            </View>
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
          <FoldText type="body-md" style={styles.successSubtext}>
            {assetType === "bitcoin" ? "Broadcasted to the network" : "Payment sent"}
          </FoldText>
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
  addressContent: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  addressTitle: {
    color: colorMaps.face.primary,
  },
  addressActions: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    alignItems: "center",
    gap: spacing["200"],
  },
  addressPreview: {
    color: colorMaps.face.tertiary,
  },
  confirmContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  confirmHeader: {
    alignItems: "center",
    gap: spacing["200"],
    paddingBottom: spacing["200"],
  },
  confirmAmount: {
    color: colorMaps.face.primary,
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
