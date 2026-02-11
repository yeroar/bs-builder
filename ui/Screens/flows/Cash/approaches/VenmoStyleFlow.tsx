/**
 * Approach F: Venmo-style
 *
 * Social-first P2P payment. Key patterns:
 * - Note/description is prominent (required, with emoji)
 * - Privacy selector (Public / Friends / Private)
 * - No confirmation screen — one-tap Pay
 * - Success shows social post preview
 *
 * Flow: [PaymentMethodModal] → Recipient → Amount + Note → Success
 * Steps: 2 (Recipient → Amount+Note → Success)
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
import PillSelector from "../../../../../components/Selectors/PillSelector/PillSelector";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { UserIcon } from "../../../../../components/Icons/UserIcon";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";
import RecipientStep from "./RecipientStep";

export interface VenmoStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

type Privacy = "public" | "friends" | "private";

export default function VenmoStyleFlow({ assetType = "cash", onComplete, onClose }: VenmoStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [flowStack, setFlowStack] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [privacy, setPrivacy] = useState<Privacy>("friends");
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
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
  } = useAmountInput({ initialValue: "0" });

  const numAmount = parseFloat(amount) || 0;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setFlowStack(assetType === "cash" ? ["amountNote"] : ["recipient"]);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handlePay = () => {
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

  const canPay = !isEmpty && note.trim().length > 0;

  const renderScreen = (step: string) => {
    switch (step) {
      case "recipient":
        return (
          <RecipientStep
            assetType={assetType}
            navVariant="start"
            onContinue={(r) => {
              setRecipient(r);
              setFlowStack(prev => [...prev, "amountNote"]);
            }}
            onClose={() => setFlowStack([])}
          />
        );
      case "amountNote":
        return (
          <FullscreenTemplate
            title={config.title}
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <EnterAmount>
              <View style={styles.content}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={<TopContext variant="empty" />}
                  bottomContextSlot={<BottomContext variant="empty" />}
                />

                {/* Note field — required, social pattern */}
                <View style={styles.noteSection}>
                  <TextField
                    placeholder="What's it for?"
                    value={note}
                    onChangeText={setNote}
                  />

                  {/* Privacy selector */}
                  <View style={styles.privacyRow}>
                    <PillSelector
                      label="Public"
                      isActive={privacy === "public"}
                      onPress={() => setPrivacy("public")}
                      size="sm"
                    />
                    <PillSelector
                      label="Friends"
                      isActive={privacy === "friends"}
                      onPress={() => setPrivacy("friends")}
                      size="sm"
                    />
                    <PillSelector
                      label="Private"
                      isActive={privacy === "private"}
                      onPress={() => setPrivacy("private")}
                      size="sm"
                    />
                  </View>
                </View>
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={canPay ? `Pay ${config.formatAmount(numAmount)}` : "Pay"}
                actionDisabled={!canPay}
                onActionPress={handlePay}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  // Success — social post style
  if (showSuccess) {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    return (
      <FullscreenTemplate
        title="Payment sent"
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

          {/* Social post preview */}
          <View style={styles.socialPost}>
            <View style={styles.socialHeader}>
              <IconContainer
                size="sm"
                icon={<UserIcon width={20} height={20} color={colorMaps.face.primary} />}
              />
              <View style={styles.socialMeta}>
                <FoldText type="body-md" style={styles.socialName}>{assetType === "cash" ? "Withdrawal complete" : `You paid ${recipient || "someone"}`}</FoldText>
                <FoldText type="body-sm" style={styles.socialPrivacy}>
                  {privacy === "public" ? "Public" : privacy === "friends" ? "Friends only" : "Private"}
                </FoldText>
              </View>
            </View>
            <FoldText type="body-md" style={styles.socialNote}>{note || "..."}</FoldText>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    gap: spacing["300"],
  },
  noteSection: {
    gap: spacing["300"],
  },
  privacyRow: {
    flexDirection: "row",
    gap: spacing["200"],
  },

  // Success — social post
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["500"],
    paddingHorizontal: spacing["500"],
  },
  successAmount: {
    color: colorMaps.face.primary,
  },
  socialPost: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 12,
    padding: spacing["400"],
    gap: spacing["300"],
  },
  socialHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  socialMeta: {
    flex: 1,
    gap: 2,
  },
  socialName: {
    color: colorMaps.face.primary,
  },
  socialPrivacy: {
    color: colorMaps.face.tertiary,
  },
  socialNote: {
    color: colorMaps.face.secondary,
  },
});
