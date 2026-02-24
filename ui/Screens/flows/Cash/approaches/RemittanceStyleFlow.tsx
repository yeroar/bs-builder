/**
 * Approach J: Remittance style (Remitly/Western Union)
 *
 * Multi-step corridor transfer. Key patterns:
 * - Destination country selector
 * - Dual amount with live exchange rate
 * - Recipient details form (name, bank, account)
 * - Full review with fee breakdown
 * - Longest flow — progressive disclosure across many steps
 *
 * Flow: [PaymentMethodModal] → Country → Amount → Recipient Details → Review → Success
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
import QuickBuyInput, { QuickBuyItem } from "../../../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface RemittanceStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

const COUNTRIES: QuickBuyItem<string>[] = [
  { label: "Mexico (MXN)", value: "MXN" },
  { label: "Philippines (PHP)", value: "PHP" },
  { label: "India (INR)", value: "INR" },
  { label: "Colombia (COP)", value: "COP" },
  { label: "Nigeria (NGN)", value: "NGN" },
  { label: "UK (GBP)", value: "GBP" },
];

const RATES: Record<string, number> = {
  MXN: 17.2, PHP: 56.1, INR: 83.5, COP: 3950, NGN: 1550, GBP: 0.79,
};

export default function RemittanceStyleFlow({ assetType = "cash", onComplete, onClose }: RemittanceStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(["country"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Payment method (pre-populated default)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

  // Country
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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
  const rate = RATES[selectedCountry || "MXN"] || 1;
  const receivedAmount = numAmount * rate;
  const feeAmount = numAmount * config.feeRate;

  // Recipient form
  const [recipientName, setRecipientName] = useState("");
  const [recipientBank, setRecipientBank] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");

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

  const isRecipientValid = recipientName.trim() !== "" && recipientBank.trim() !== "" && recipientAccount.trim() !== "";
  const countryLabel = COUNTRIES.find(c => c.value === selectedCountry)?.label || "";

  const renderScreen = (step: string) => {
    switch (step) {
      case "country":
        return (
          <FullscreenTemplate
            title="Send money to"
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            disableAnimation
          >
            <View style={styles.countryContent}>
              <QuickBuyInput
                items={COUNTRIES}
                selectedValue={selectedCountry}
                onSelect={(val) => {
                  setSelectedCountry(val as string);
                  setFlowStack(prev => [...prev, "amount"]);
                }}
                columns={2}
              />
            </View>
          </FullscreenTemplate>
        );
      case "amount":
        return (
          <FullscreenTemplate
            title={`Send to ${countryLabel}`}
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
                {!isEmpty && (
                  <FoldText type="body-md" style={styles.exchangeRate}>
                    {assetType === "cash" ? "You receive" : "Recipient gets"} ~{receivedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} {selectedCountry}
                  </FoldText>
                )}
                <FoldText type="body-sm" style={styles.rateLabel}>
                  Rate: 1 USD = {rate} {selectedCountry}
                </FoldText>
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Continue" : `Continue · ${config.formatAmount(numAmount)}`}
                actionDisabled={isEmpty}
                onActionPress={() => setFlowStack(prev => [...prev, assetType === "cash" ? "review" : "recipientForm"])}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "recipientForm":
        return (
          <FullscreenTemplate
            title="Recipient details"
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable
            navVariant="step"
            disableAnimation
            keyboardAware
            footer={
              <ModalFooter
                type="default"
                modalVariant="keyboard"
                primaryButton={
                  <Button
                    label="Review transfer"
                    hierarchy="primary"
                    size="md"
                    disabled={!isRecipientValid}
                    onPress={() => setFlowStack(prev => [...prev, "review"])}
                  />
                }
              />
            }
          >
            <View style={styles.formContent}>
              <TextField label="Full name" placeholder="Recipient's full name" value={recipientName} onChangeText={setRecipientName} />
              <TextField label="Bank" placeholder="Bank name" value={recipientBank} onChangeText={setRecipientBank} />
              <TextField label="Account number" placeholder="Account or CLABE" value={recipientAccount} onChangeText={setRecipientAccount} keyboardType="numeric" />
            </View>
          </FullscreenTemplate>
        );
      case "review":
        return (
          <FullscreenTemplate
            title="Review transfer"
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
            <View style={styles.reviewContent}>
              <View style={styles.reviewHeader}>
                <FoldText type="header-lg" style={styles.reviewAmount}>
                  {config.formatAmount(numAmount)}
                </FoldText>
                <FoldText type="body-md" style={styles.reviewReceived}>
                  {assetType === "cash"
                    ? `~${receivedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${selectedCountry}`
                    : `${recipientName} receives ~${receivedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${selectedCountry}`}
                </FoldText>
              </View>

              <Divider />

              <ReceiptDetails>
                <ListItemReceipt label="You send" value={config.formatAmount(numAmount)} />
                <ListItemReceipt label={`Fee · ${config.feeLabel}`} value={config.formatAmount(feeAmount)} />
                <ListItemReceipt label="Exchange rate" value={`1 USD = ${rate} ${selectedCountry}`} />
                <ListItemReceipt label="Recipient gets" value={`${receivedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${selectedCountry}`} />
                {assetType !== "cash" && <ListItemReceipt label="To" value={recipientName} />}
                {assetType !== "cash" && <ListItemReceipt label="Bank" value={recipientBank} />}
                <ListItemReceipt label="Delivery" value="1–3 business days" />
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
        title="Transfer sent"
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
            {assetType === "cash" ? countryLabel : `to ${recipientName} · ${countryLabel}`}
          </FoldText>
          <FoldText type="body-sm" style={styles.successDelivery}>
            Estimated delivery: 1–3 business days
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
  countryContent: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["600"],
  },
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    alignItems: "center",
    gap: spacing["200"],
  },
  exchangeRate: {
    color: colorMaps.face.secondary,
  },
  rateLabel: {
    color: colorMaps.face.tertiary,
  },
  formContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  reviewContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  reviewHeader: {
    alignItems: "center",
    gap: spacing["200"],
    paddingBottom: spacing["200"],
  },
  reviewAmount: {
    color: colorMaps.face.primary,
  },
  reviewReceived: {
    color: colorMaps.face.secondary,
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
  successDelivery: {
    color: colorMaps.face.tertiary,
  },
});
