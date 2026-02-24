/**
 * Approach O: Quick Convert Style
 *
 * Lightweight convert action. Sheet-first, fullscreen-second.
 * Inverse of BottomSheetWithdrawFlow — starts as bottom sheet, expands for confirmation.
 * Key patterns:
 * - Bottom sheet amount entry with From/To chips (Cash App Add Money + Wise Dual)
 * - Amount chips + MAX (Fuse Slider)
 * - Embedded keypad in sheet (Cash App Keypad)
 * - Full-screen confirmation with dual display (Wise Dual Currency)
 * - Success with recurring upsell (Cash App Upsell)
 *
 * Flow: MiniModal(amount) → FullScreen(confirm) → Success(upsell)
 * Steps: 3 (1 sheet + 2 screens)
 */
import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import QuickBuyInput from "../../../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import Chip from "../../../../../components/Primitives/Chip/Chip";
import MiniModal from "../../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { colorMaps, spacing, radius } from "../../../../../components/tokens";
import { AssetType } from "./assetConfig";

export interface QuickConvertStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

const QUICK_AMOUNTS = [
  { label: "$50", value: 50 },
  { label: "$100", value: 100 },
  { label: "$500", value: 500 },
  { label: "MAX", value: 4900 },
];

// Simulated exchange rate
const EXCHANGE_RATE = 0.92; // 1 USD = 0.92 EUR

export default function QuickConvertStyleFlow({ assetType = "cash", onComplete, onClose }: QuickConvertStyleFlowProps) {
  const [showSheet, setShowSheet] = useState(true);
  const [flowStack, setFlowStack] = useState<string[]>([]);
  const [flowAmount, setFlowAmount] = useState("0");
  const [showSuccess, setShowSuccess] = useState(false);

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

  const numAmount = parseFloat(amount) || 0;
  const convertedAmount = numAmount * EXCHANGE_RATE;
  const feeRate = 0.005; // 0.5%
  const feeAmount = numAmount * feeRate;
  const receiveAmount = (numAmount - feeAmount) * EXCHANGE_RATE;

  const numFlowAmount = parseFloat(flowAmount) || 0;
  const flowFee = numFlowAmount * feeRate;
  const flowReceive = (numFlowAmount - flowFee) * EXCHANGE_RATE;

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  const handleSheetContinue = () => {
    setFlowAmount(amount);
    setShowSheet(false);
    setFlowStack(["confirm"]);
  };

  const handleConfirm = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess && !showSheet) onClose();
  };

  const handleDone = () => {
    setShowSuccess(false);
    onComplete();
  };

  const handleSheetClose = () => {
    setShowSheet(false);
    onClose();
  };

  const fmtUsd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtEur = (n: number) => `€${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const renderScreen = (step: string) => {
    switch (step) {
      case "confirm":
        return (
          <FullscreenTemplate
            title="Confirm conversion"
            onLeftPress={() => {
              setFlowStack([]);
              setShowSheet(true);
            }}
            scrollable={true}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button label="Convert now" hierarchy="primary" size="md" onPress={handleConfirm} />
                }
              />
            }
          >
            <View style={styles.confirmContent}>
              {/* Large dual amount display */}
              <View style={styles.dualAmount}>
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>You convert</FoldText>
                  <FoldText type="header-xs" style={styles.dualValue}>{fmtUsd(numFlowAmount)}</FoldText>
                </View>
                <Divider />
                <View style={styles.dualRow}>
                  <FoldText type="body-sm" style={styles.dualLabel}>You receive</FoldText>
                  <FoldText type="header-xs" style={styles.dualValueAccent}>{fmtEur(flowReceive)}</FoldText>
                </View>
              </View>

              {/* Details */}
              <ReceiptDetails>
                <ListItemReceipt label="Rate" value={`1 USD = ${EXCHANGE_RATE} EUR`} />
                <ListItemReceipt label="Fee (0.5%)" value={fmtUsd(flowFee)} />
                <ListItemReceipt label="You receive" value={fmtEur(flowReceive)} />
                <ListItemReceipt label="Speed" value="Instant" />
              </ReceiptDetails>

              <View style={styles.rateNote}>
                <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary }}>
                  Rate guaranteed for 30 seconds
                </FoldText>
              </View>
            </View>
          </FullscreenTemplate>
        );

      default:
        return null;
    }
  };

  // Success with recurring upsell
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
          <FoldText type="header-lg" style={styles.successTitle}>
            CONVERTED
          </FoldText>
          <FoldText type="body-md" style={styles.successSubtext}>
            {`${fmtUsd(numFlowAmount)} → ${fmtEur(flowReceive)}`}
          </FoldText>

          {/* Recurring upsell */}
          <View style={styles.upsellCard}>
            <FoldText type="body-sm-bold" style={styles.upsellTitle}>
              Set up recurring?
            </FoldText>
            <FoldText type="body-sm" style={styles.upsellText}>
              Auto-convert every week or month at the best available rate.
            </FoldText>
            <Button label="Set up" hierarchy="tertiary" size="sm" onPress={() => {}} />
          </View>
        </View>
      </FullscreenTemplate>
    );
  }

  return (
    <>
      {/* ScreenStack for confirm step */}
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

      {/* Amount entry sheet */}
      <Modal
        visible={showSheet}
        transparent
        animationType="none"
        onRequestClose={handleSheetClose}
      >
        <MiniModal
          variant="default"
          onClose={handleSheetClose}
          showHeader={false}
        >
          <View style={styles.sheetContent}>
            {/* From/To chip header */}
            <View style={styles.chipRow}>
              <Chip label="USD" type="primary" />
              <FoldText type="body-sm" style={styles.chipArrow}>→</FoldText>
              <Chip label="EUR" type="accent" />
            </View>

            {/* Amount display */}
            <CurrencyInput
              value={formatDisplayValue(amount)}
              topContextSlot={<TopContext variant="empty" />}
              bottomContextSlot={<BottomContext variant="empty" />}
            />

            {!isEmpty && (
              <FoldText type="body-sm" style={styles.convertedPreview}>
                ≈ {fmtEur(convertedAmount)}
              </FoldText>
            )}

            {/* Quick amounts */}
            <QuickBuyInput
              items={QUICK_AMOUNTS}
              selectedValue={parseFloat(amount) || null}
              onSelect={handleQuickAmount}
              columns={4}
            />

            {/* Embedded keypad */}
            <Keypad
              onNumberPress={handleNumberPress}
              onDecimalPress={handleDecimalPress}
              onBackspacePress={handleBackspacePress}
              disableDecimal={hasDecimal}
              actionBar
              actionLabel={isEmpty ? "Convert" : `Convert ${fmtUsd(numAmount)}`}
              actionDisabled={isEmpty}
              onActionPress={handleSheetContinue}
            />
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

  // Sheet
  sheetContent: {
    gap: spacing["300"],
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["300"],
  },
  chipArrow: {
    color: colorMaps.face.tertiary,
  },
  convertedPreview: {
    color: colorMaps.face.positiveBold,
    textAlign: "center",
  },

  // Confirm
  confirmContent: {
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
  dualValueAccent: {
    color: colorMaps.face.positiveBold,
  },
  rateNote: {
    alignItems: "center",
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
  upsellCard: {
    marginTop: spacing["400"],
    backgroundColor: colorMaps.layer.primary,
    borderRadius: radius.lg,
    padding: spacing["500"],
    gap: spacing["200"],
    alignItems: "center",
    width: "100%",
  },
  upsellTitle: {
    color: colorMaps.face.primary,
  },
  upsellText: {
    color: colorMaps.face.secondary,
    textAlign: "center",
  },
});
