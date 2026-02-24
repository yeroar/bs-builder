/**
 * Approach N: Guarded Send Style
 *
 * High-value send with extra friction as a feature.
 * Key patterns:
 * - Contact-first picker with sync card (Cash App Recipient)
 * - Fuse-style % slider with snap points (Fuse Slider)
 * - Dual currency summary display (Wise)
 * - Password authentication gate (Wise Auth)
 *
 * Flow: Recipient → Amount(slider) → TransferSummary(dual) → PasswordAuth → Success
 * Steps: 5 (most secure)
 */
import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import PercentSlider from "../../../../../components/Inputs/PercentSlider/PercentSlider";
import TextField from "../../../../../components/Inputs/TextContainer/TextField";
import ListItem from "../../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { ShieldIcon } from "../../../../../components/Icons/ShieldIcon";
import { UserIcon } from "../../../../../components/Icons/UserIcon";
import { ChevronRightIcon } from "../../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface GuardedSendStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

type FlowStep = "recipient" | "amount" | "transferSummary" | "passwordAuth";

const CONTACTS = [
  { id: "1", name: "Alex Johnson", phone: "+1 (555) 012-3456" },
  { id: "2", name: "Sarah Chen", phone: "+1 (555) 789-0123" },
  { id: "3", name: "Marcus Davis", phone: "+1 (555) 456-7890" },
];

const MAX_BALANCE = 4900;

export default function GuardedSendStyleFlow({ assetType = "cash", onComplete, onClose }: GuardedSendStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["recipient"]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientSearch, setRecipientSearch] = useState("");
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [sliderPercent, setSliderPercent] = useState(0);

  // Payment method
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("visa");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

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

  const handleSelectContact = (name: string) => {
    setRecipientName(name);
    pushStep("amount");
  };

  const handleAmountContinue = () => {
    setFlowAmount(amount);
    pushStep("transferSummary");
  };

  const handleSliderChange = (percent: number) => {
    setSliderPercent(percent);
    const usdValue = (MAX_BALANCE * percent) / 100;
    setAmount(usdValue > 0 ? usdValue.toFixed(2) : "0");
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) onClose();
  };

  const handleDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const filteredContacts = recipientSearch
    ? CONTACTS.filter(c =>
        c.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
        c.phone.includes(recipientSearch)
      )
    : CONTACTS;

  const renderScreen = (step: string) => {
    switch (step) {
      // Step 1: Contact picker with sync card
      case "recipient":
        return (
          <FullscreenTemplate
            title="Send to"
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={true}
            keyboardAware
            disableAnimation
          >
            <View style={styles.recipientContent}>
              <TextField
                placeholder="Name, phone, or email"
                value={recipientSearch}
                onChangeText={setRecipientSearch}
                autoFocus
              />

              {/* Sync contacts card */}
              <View style={styles.syncCard}>
                <FoldText type="body-sm-bold" style={styles.syncTitle}>
                  Sync your contacts
                </FoldText>
                <FoldText type="body-sm" style={styles.syncText}>
                  Find friends who already use the app and send instantly.
                </FoldText>
                <Button label="Sync contacts" hierarchy="tertiary" size="sm" onPress={() => {}} />
              </View>

              {/* Contact list */}
              <View style={styles.contactList}>
                <FoldText type="body-sm" style={styles.sectionLabel}>Contacts</FoldText>
                {filteredContacts.map(contact => (
                  <ListItem
                    key={contact.id}
                    title={contact.name}
                    secondaryText={contact.phone}
                    leadingSlot={
                      <IconContainer
                        size="sm"
                        icon={<UserIcon width={20} height={20} color={colorMaps.face.primary} />}
                      />
                    }
                    trailingSlot={<ChevronRightIcon width={16} height={16} color={colorMaps.face.tertiary} />}
                    onPress={() => handleSelectContact(contact.name)}
                  />
                ))}
              </View>
            </View>
          </FullscreenTemplate>
        );

      // Step 2: Amount with chip presets
      case "amount":
        return (
          <FullscreenTemplate
            title={`Send to ${recipientName}`}
            onLeftPress={popStep}
            scrollable={false}
            navVariant="step"
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
                      onPaymentMethodPress={() => setIsPaymentModalVisible(true)}
                    />
                  }
                />

                <PercentSlider
                  value={sliderPercent}
                  onValueChange={handleSliderChange}
                />
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Continue" : `Continue · $${(parseFloat(amount) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                actionDisabled={isEmpty}
                onActionPress={handleAmountContinue}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );

      // Step 3: Rich transfer summary
      case "transferSummary":
        return (
          <FullscreenTemplate
            title="Review transfer"
            onLeftPress={popStep}
            scrollable={true}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button label="Continue" hierarchy="primary" size="md" onPress={() => pushStep("passwordAuth")} />
                }
              />
            }
          >
            <View style={styles.summaryContent}>
              {/* Dual amount box */}
              <View style={styles.dualAmount}>
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>You send</FoldText>
                  <FoldText type="header-xs" style={styles.dualValue}>
                    ${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </FoldText>
                </View>
                <Divider />
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>{recipientName} receives</FoldText>
                  <FoldText type="header-xs" style={styles.dualValue}>
                    ${receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </FoldText>
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
                <ListItemReceipt label="Send amount" value={`$${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <ListItemReceipt label={`Fee (${config.feeLabel})`} value={`$${feeAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <ListItemReceipt label="They receive" value={`$${receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
              </ReceiptDetails>

              {/* Delivery estimate */}
              <View style={styles.deliveryBox}>
                <FoldText type="body-sm" style={{ color: colorMaps.face.secondary }}>
                  Estimated delivery: Instant
                </FoldText>
              </View>
            </View>
          </FullscreenTemplate>
        );

      // Step 4: Password gate
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
                    label="Approve & send"
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
                {`To send $${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to ${recipientName}`}
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

  // Success screen
  if (showSuccess) {
    return (
      <FullscreenTemplate
        title=""
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
          <FoldText type="header-lg" style={styles.successTitle}>SENT</FoldText>
          <FoldText type="body-md" style={styles.successSubtext}>
            {`$${receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to ${recipientName}`}
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

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },

  // Recipient
  recipientContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["400"],
  },
  syncCard: {
    backgroundColor: colorMaps.layer.primary,
    borderRadius: radius.lg,
    padding: spacing["500"],
    gap: spacing["200"],
    alignItems: "center",
  },
  syncTitle: {
    color: colorMaps.face.primary,
  },
  syncText: {
    color: colorMaps.face.secondary,
    textAlign: "center",
  },
  contactList: {
    gap: spacing["100"],
  },
  sectionLabel: {
    color: colorMaps.face.tertiary,
    marginBottom: spacing["100"],
  },

  // Amount
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    gap: spacing["400"],
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
