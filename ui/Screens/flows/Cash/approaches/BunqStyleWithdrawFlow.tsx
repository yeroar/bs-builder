/**
 * Approach D: Instant Debit Card Withdrawal
 *
 * Based on FE-482 requirements:
 * - Debit card selection via modal
 * - Amount entry with max button + error state
 * - Confirmation with receipt breakdown (Transfer, Fees 1.5%, Total) + legal copy
 * - Success: "Withdrawal initiated"
 *
 * Flow: [DebitCardModal] → Amount → Confirmation → Success
 */
import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import WheelPicker from "../../../../../components/Inputs/WheelPicker/WheelPicker";
import { PmSelectorVariant } from "../../../../../components/Inputs/CurrencyInput/PmSelector";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface BunqStyleWithdrawFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

type Phase = "amount" | "confirmation" | "success";

const MAX_AMOUNT = 2500;
const FEE_RATE = 0.015;

const LEGAL_COPY =
  "By confirming, you authorize Fold to initiate an instant withdrawal to your debit card. Funds are typically available within 30 minutes but may take up to 24 hours depending on your bank. A 1.5% fee applies to all instant withdrawals. This transaction cannot be reversed once initiated.";

export default function BunqStyleWithdrawFlow({ assetType = "cash", onComplete, onClose }: BunqStyleWithdrawFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("amount");
  const [started, setStarted] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Payment method (debit card)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();

  // Wheel picker amounts: $1 .. $2500
  const amounts = useMemo(
    () => Array.from({ length: MAX_AMOUNT }, (_, i) => String(i + 1)),
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const numAmount = selectedIndex + 1;

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
    setStarted(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    onClose();
  };

  const handleNext = () => {
    setConfirmedAmount(String(numAmount));
    setPhase("confirmation");
  };

  const handleConfirm = () => {
    setPhase("success");
  };

  const handleDone = () => {
    onComplete();
  };

  // Debit card modal (before flow starts)
  if (!started) {
    return (
      <ChoosePaymentMethodModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSelect={handlePaymentMethodSelect}
        type="debitCard"
      />
    );
  }

  // Success screen
  if (phase === "success") {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    return (
      <FullscreenTemplate
        title="Withdrawal initiated"
        leftIcon="x"
        onLeftPress={handleDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button label="View details" hierarchy="inverse" size="md" onPress={() => console.log("View details")} />
            }
            secondaryButton={
              <Button label="Done" hierarchy="secondary" size="md" onPress={handleDone} />
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
            Withdrawing to {selectedLabel || "debit card"}
          </FoldText>
        </View>
      </FullscreenTemplate>
    );
  }

  // Confirmation screen
  if (phase === "confirmation") {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    const confirmedFee = numConfirmed * FEE_RATE;
    const confirmedTotal = numConfirmed + confirmedFee;
    return (
      <FullscreenTemplate
        title="Confirm withdrawal"
        onLeftPress={() => setPhase("amount")}
        scrollable
        navVariant="step"
        disableAnimation
        footer={
          <ModalFooter
            type="default"
            primaryButton={
              <Button
                label="Confirm withdrawal"
                hierarchy="primary"
                size="md"
                onPress={handleConfirm}
              />
            }
          />
        }
      >
        <View style={styles.confirmationContent}>
          {/* Amount header */}
          <View style={styles.confirmationHeader}>
            <FoldText type="header-lg" style={styles.confirmationAmount}>
              {config.formatAmount(numConfirmed)}
            </FoldText>
            <FoldText type="body-md" style={styles.confirmationCardLabel}>
              to {selectedLabel || "Debit card"}
            </FoldText>
          </View>

          <Divider />

          {/* Receipt breakdown */}
          <ReceiptDetails>
            <ListItemReceipt label="Transfer" value={config.formatAmount(numConfirmed)} />
            <ListItemReceipt label="Fees · 1.5%" value={config.formatAmount(confirmedFee)} />
            <ListItemReceipt label="Total" value={config.formatAmount(confirmedTotal)} />
          </ReceiptDetails>

          <Divider />

          {/* Legal copy */}
          <FoldText type="body-sm" style={styles.legalCopy}>
            {LEGAL_COPY}
          </FoldText>
        </View>
      </FullscreenTemplate>
    );
  }

  // Amount entry screen — wheel picker
  return (
    <FullscreenTemplate
      title="Instant withdrawal"
      leftIcon="x"
      onLeftPress={onClose}
      scrollable={false}
      disableAnimation
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button
              label={`Next · ${config.formatAmount(numAmount)}`}
              hierarchy="primary"
              size="md"
              onPress={handleNext}
            />
          }
        />
      }
    >
      <View style={styles.wheelContent}>
        <WheelPicker
          items={amounts}
          selectedIndex={selectedIndex}
          onIndexChange={setSelectedIndex}
          formatLabel={(val) => config.formatAmount(Number(val))}
        />
      </View>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  // Wheel picker
  wheelContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing["500"],
  },

  // Confirmation
  confirmationContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  confirmationHeader: {
    alignItems: "center",
    gap: spacing["200"],
    paddingBottom: spacing["200"],
  },
  confirmationAmount: {
    color: colorMaps.face.primary,
  },
  confirmationCardLabel: {
    color: colorMaps.face.secondary,
  },
  legalCopy: {
    color: colorMaps.face.tertiary,
  },

  // Success
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
