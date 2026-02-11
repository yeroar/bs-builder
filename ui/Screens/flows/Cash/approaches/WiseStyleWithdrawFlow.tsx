/**
 * Approach E: Wise-style Withdraw
 *
 * Literal recreation of Wise's "Send Money" UX applied to withdrawal.
 * Key patterns:
 * - Enter amount with dual display (you withdraw / you receive after fee)
 * - Transfer summary (fees breakdown, delivery estimate, payment method)
 * - Confirm & send (full receipt with reference field)
 * - Auth gate (password entry before final confirmation)
 * - Success with green fill
 *
 * Flow: EnterAmount(dual) → TransferSummary → ConfirmAndSend → PasswordAuth → Success
 * Steps: 5 (most thorough)
 */
import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import TxConfirmation from "../../../../Templates/TxConfirmation/TxConfirmation";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { ShieldIcon } from "../../../../../components/Icons/ShieldIcon";
import { colorMaps, spacing, radius } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { formatWithCommas } from "../../../../../components/utils/formatWithCommas";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface WiseStyleWithdrawFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

type FlowStep = "recipient" | "enterAmount" | "transferSummary" | "confirmAndSend" | "passwordAuth";

export default function WiseStyleWithdrawFlow({ assetType = "cash", onComplete, onClose }: WiseStyleWithdrawFlowProps) {
  const config = getAssetConfig(assetType);
  const [flowStack, setFlowStack] = useState<FlowStep[]>(assetType === "cash" ? ["enterAmount"] : ["recipient"]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [reference, setReference] = useState("");
  const [password, setPassword] = useState("");
  const [recipient, setRecipient] = useState("");

  // Payment method
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("visa");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

  const numAmount = parseFloat(flowAmount) || 0;
  const feeAmount = numAmount * config.feeRate;
  const receiveAmount = numAmount - feeAmount;

  const pushStep = (step: FlowStep) => setFlowStack(prev => [...prev, step]);
  const popStep = () => setFlowStack(prev => prev.slice(0, -1));

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsPaymentModalVisible(false);
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
              pushStep("enterAmount");
            }}
            onClose={() => setFlowStack([])}
          />
        );

      // Step 2: Enter Amount — dual display (withdraw / receive)
      case "enterAmount":
        return <EnterAmountScreen
          assetType={assetType}
          onContinue={(amt: string) => {
            setFlowAmount(amt);
            pushStep("transferSummary");
          }}
          onClose={() => setFlowStack([])}
        />;

      // Step 2: Transfer Summary — fees, delivery, payment method
      case "transferSummary":
        return (
          <FullscreenTemplate
            title="Transfer summary"
            onLeftPress={popStep}
            scrollable={true}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    {`Instant speed. ${config.feeLabel} fee.`}
                  </FoldText>
                }
                primaryButton={
                  <Button label="Continue" hierarchy="primary" size="md" onPress={() => pushStep("confirmAndSend")} />
                }
              />
            }
          >
            <View style={styles.summaryContent}>
              {/* Dual amount display */}
              <View style={styles.dualAmount}>
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>{assetType === "bitcoin" ? "You send" : "You withdraw"}</FoldText>
                  <FoldText type="header-xs" style={styles.dualValue}>{config.formatAmount(numAmount)}</FoldText>
                </View>
                <Divider />
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>You receive</FoldText>
                  <FoldText type="header-xs" style={styles.dualValue}>{config.formatAmount(receiveAmount)}</FoldText>
                </View>
              </View>

              {/* Payment method */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Payment method</FoldText>
              </View>
              <BottomContext
                variant="paymentMethod"
                paymentMethodVariant={selectedPaymentMethod}
                paymentMethodBrand={selectedBrand}
                paymentMethodLabel={selectedLabel}
                onPaymentMethodPress={() => setIsPaymentModalVisible(true)}
              />

              {/* Fee breakdown */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Fee breakdown</FoldText>
              </View>
              <ReceiptDetails>
                <ListItemReceipt label={assetType === "bitcoin" ? "Send" : "Withdrawal"} value={config.formatAmount(numAmount)} />
                <ListItemReceipt label={`Fee (${config.feeLabel})`} value={config.formatAmount(feeAmount)} />
                <ListItemReceipt label="You receive" value={config.formatAmount(receiveAmount)} />
              </ReceiptDetails>

              {/* Delivery estimate */}
              <View style={styles.deliveryBox}>
                <FoldText type="body-sm" style={{ color: colorMaps.face.secondary }}>
                  {assetType === "bitcoin" ? "Estimated delivery: 10–30 minutes (1 confirmation)" : "Estimated delivery: Instant – up to 30 minutes"}
                </FoldText>
              </View>
            </View>
          </FullscreenTemplate>
        );

      // Step 3: Confirm & Send — full receipt
      case "confirmAndSend":
        return (
          <FullscreenTemplate
            title="Confirm and send"
            onLeftPress={popStep}
            scrollable={true}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button label="Confirm and send" hierarchy="primary" size="md" onPress={() => pushStep("passwordAuth")} />
                }
              />
            }
          >
            <View style={styles.confirmContent}>
              {/* Payment method */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Pay with</FoldText>
              </View>
              <BottomContext
                variant="paymentMethod"
                paymentMethodVariant={selectedPaymentMethod}
                paymentMethodBrand={selectedBrand}
                paymentMethodLabel={selectedLabel}
                onPaymentMethodPress={() => setIsPaymentModalVisible(true)}
              />

              {/* Transfer details */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Transfer details</FoldText>
              </View>
              <ReceiptDetails>
                <ListItemReceipt label={assetType === "bitcoin" ? "You send" : "You withdraw"} value={config.formatAmount(numAmount)} />
                <ListItemReceipt label="Fee" value={config.formatAmount(feeAmount)} />
                <ListItemReceipt label="You receive" value={config.formatAmount(receiveAmount)} />
                <ListItemReceipt label="Delivery" value={assetType === "bitcoin" ? "~30 min" : "Instant"} />
              </ReceiptDetails>

              <Divider />

              {/* Recipient details */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Recipient</FoldText>
              </View>
              <ReceiptDetails>
                <ListItemReceipt label="To" value={assetType === "bitcoin" ? "bc1q...x7f9" : (selectedLabel || "Visa •••• 4242")} />
                <ListItemReceipt label="Type" value={assetType === "bitcoin" ? "Bitcoin transfer" : "Instant withdrawal"} />
              </ReceiptDetails>

              <Divider />

              {/* Reference field */}
              <View style={styles.sectionHeader}>
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.secondary }}>Reference (optional)</FoldText>
              </View>
              <TextInput
                style={styles.referenceInput}
                value={reference}
                onChangeText={setReference}
                placeholder="Add a note"
                placeholderTextColor={colorMaps.face.disabled}
              />
            </View>
          </FullscreenTemplate>
        );

      // Step 4: Password Auth gate
      case "passwordAuth":
        return (
          <FullscreenTemplate
            title=""
            onLeftPress={popStep}
            scrollable={false}
            navVariant="step"
            disableAnimation
            keyboardAware
            footer={
              <ModalFooter
                modalVariant="keyboard"
                primaryButton={
                  <Button
                    label="Approve"
                    hierarchy="primary"
                    size="md"
                    disabled={password.length < 4}
                    onPress={() => {
                      setFlowStack([]);
                      setShowSuccess(true);
                    }}
                  />
                }
              />
            }
          >
            <View style={styles.authContent}>
              <ShieldIcon width={40} height={40} color={colorMaps.object.primary.bold.default} />
              <FoldText type="header-sm" style={styles.authTitle}>
                Enter your password
              </FoldText>
              <FoldText type="body-sm" style={styles.authSubtext}>
                {`To confirm your ${config.formatAmount(numAmount)} ${assetType === "bitcoin" ? "transfer" : "withdrawal"}`}
              </FoldText>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={colorMaps.face.disabled}
                secureTextEntry
                autoFocus
              />
              <Button label="Forgot password?" hierarchy="tertiary" size="sm" onPress={() => {}} />
            </View>
          </FullscreenTemplate>
        );

      default:
        return null;
    }
  };

  // Success screen — green fill
  if (showSuccess) {
    return (
      <FullscreenTemplate
        title=""
        leftIcon="x"
        onLeftPress={handleSuccessDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button label="Got it" hierarchy="inverse" size="md" onPress={handleSuccessDone} />
            }
          />
        }
      >
        <View style={styles.successContent}>
          <CheckCircleIcon width={56} height={56} color={colorMaps.face.primary} />
          <FoldText type="header-lg" style={styles.successTitle}>ALL DONE</FoldText>
          <FoldText type="body-md" style={styles.successSubtext}>
            {`${config.formatAmount(receiveAmount)} is on its way to your ${config.destination}`}
          </FoldText>
        </View>
      </FullscreenTemplate>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <ScreenStack
          stack={flowStack}
          renderScreen={renderScreen}
          onEmpty={handleFlowEmpty}
        />
      </View>

      <ChoosePaymentMethodModal
        visible={isPaymentModalVisible}
        onClose={() => setIsPaymentModalVisible(false)}
        onSelect={handlePaymentMethodSelect}
        type="debitCard"
      />
    </>
  );
}

// --- Enter Amount sub-screen with dual currency display ---
function EnterAmountScreen({ assetType = "cash", onContinue, onClose }: { assetType?: AssetType; onContinue: (amount: string) => void; onClose: () => void }) {
  const config = getAssetConfig(assetType);
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
  const fee = numAmount * config.feeRate;
  const receive = numAmount - fee;

  return (
    <FullscreenTemplate
      title={config.title}
      onLeftPress={onClose}
      scrollable={false}
      navVariant="start"
      footer={
        <ModalFooter
          type="default"
          disclaimer={
            isEmpty ? (
              <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                Enter amount to continue
              </FoldText>
            ) : null
          }
          primaryButton={
            <Button
              label="Continue"
              hierarchy="primary"
              size="md"
              disabled={isEmpty}
              onPress={() => onContinue(amount)}
            />
          }
        />
      }
    >
      <EnterAmount>
        <View style={styles.enterAmountContent}>
          {/* You withdraw/send */}
          <View style={styles.dualInputSection}>
            <FoldText type="body-sm" style={styles.dualInputLabel}>{assetType === "bitcoin" ? "You send" : "You withdraw"}</FoldText>
            <CurrencyInput
              value={formatDisplayValue(amount)}
              topContextSlot={<TopContext variant="empty" />}
              bottomContextSlot={<BottomContext variant="empty" />}
            />
          </View>

          {/* You receive (calculated) */}
          {!isEmpty && (
            <View style={styles.dualInputSection}>
              <FoldText type="body-sm" style={styles.dualInputLabel}>You receive</FoldText>
              <FoldText type="header-md" style={styles.receiveAmount}>
                {config.formatAmount(receive)}
              </FoldText>
              <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary }}>
                {`Fee: ${config.formatAmount(fee)} (${config.feeLabel})`}
              </FoldText>
            </View>
          )}
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

  // Enter Amount
  enterAmountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    gap: spacing["400"],
  },
  dualInputSection: {
    alignItems: "center",
    gap: spacing["100"],
  },
  dualInputLabel: {
    color: colorMaps.face.tertiary,
  },
  receiveAmount: {
    color: colorMaps.face.positiveBold,
  },

  // Transfer Summary
  summaryContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["400"],
  },
  dualAmount: {
    borderWidth: 1,
    borderColor: colorMaps.border.secondary,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  dualRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing["400"],
  },
  dualLabel: {
    color: colorMaps.face.secondary,
  },
  dualValue: {
    color: colorMaps.face.primary,
  },
  sectionHeader: {
    paddingTop: spacing["200"],
  },
  deliveryBox: {
    backgroundColor: colorMaps.layer.primary,
    padding: spacing["400"],
    borderRadius: radius.md,
  },

  // Confirm & Send
  confirmContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["300"],
  },
  referenceInput: {
    borderWidth: 1,
    borderColor: colorMaps.border.secondary,
    borderRadius: radius.md,
    padding: spacing["400"],
    fontSize: 16,
    color: colorMaps.face.primary,
  },

  // Auth
  authContent: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    alignItems: "center",
    gap: spacing["300"],
  },
  authTitle: {
    color: colorMaps.face.primary,
  },
  authSubtext: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
  passwordInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: colorMaps.border.secondary,
    borderRadius: radius.md,
    padding: spacing["400"],
    fontSize: 16,
    color: colorMaps.face.primary,
    marginTop: spacing["300"],
  },

  // Success
  successContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing["300"],
    paddingHorizontal: spacing["500"],
  },
  successTitle: {
    color: colorMaps.face.primary,
  },
  successSubtext: {
    color: colorMaps.face.secondary,
    textAlign: "center",
  },
});
