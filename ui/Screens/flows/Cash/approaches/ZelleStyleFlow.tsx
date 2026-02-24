/**
 * Approach G: Zelle-style
 *
 * Bank-integrated P2P. Key patterns:
 * - Phone/email recipient with enrollment check messaging
 * - Amount + optional memo on same screen
 * - Full review screen before send (bank-trust pattern)
 * - Irreversibility warning on review
 * - Success with "instant delivery" messaging
 *
 * Flow: [PaymentMethodModal] → Amount+Address/Memo → Review → Success
 * Steps: 2 (Amount → Review → Success) — address inline, no separate recipient step
 */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Keyboard, Platform, Pressable, Animated } from "react-native";
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
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";
import ChoosePaymentMethodModal, { PaymentMethodSelection } from "../../../../Slots/Modals/ChoosePaymentMethodModal";
import { AssetType, getAssetConfig } from "./assetConfig";
import { formatSatsInput } from "../../../../../components/utils/formatWithCommas";

export interface ZelleStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

export default function ZelleStyleFlow({ assetType = "cash", onComplete, onClose }: ZelleStyleFlowProps) {
  const config = getAssetConfig(assetType);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flowStack, setFlowStack] = useState<string[]>(["amountMemo"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [memo, setMemo] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Payment method (pre-populated default)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("cardAccount");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("visa");
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>("Visa •••• 4242");

  const isBtc = assetType === "bitcoin";

  // Cash: useAmountInput for USD
  const {
    amount: cashAmount,
    handleNumberPress: cashNumberPress,
    handleDecimalPress: cashDecimalPress,
    handleBackspacePress: cashBackspacePress,
    hasDecimal,
    isEmpty: cashIsEmpty,
    formatDisplayValue,
  } = useAmountInput({ initialValue: "0" });

  // BTC: sats input (mirrors BtcSendEnterAmount pattern)
  const BTC_PRICE_USD = 102_500;
  const maxSats = 7_000_000;
  const [satsInput, setSatsInput] = useState("");

  const currentSats = parseInt(satsInput, 10) || 0;
  const satsIsEmpty = currentSats === 0;

  const satsToUsd = useCallback((sats: number): string => {
    const usd = (sats / 100_000_000) * BTC_PRICE_USD;
    if (sats === 0) return "";
    if (usd < 0.01) return "< $0.01";
    return `~$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, []);

  const formatMaxBtc = (): string => {
    const btc = maxSats / 100_000_000;
    return `₿${btc.toFixed(8).replace(/\.?0+$/, "")}`;
  };

  const handleSatsNumberPress = (num: string) => {
    if (num === ".") return;
    const newValue = satsInput + num;
    if (parseInt(newValue, 10) <= maxSats) {
      setSatsInput(newValue);
    }
  };

  const handleSatsBackspacePress = () => {
    setSatsInput(prev => prev.slice(0, -1));
  };

  const handleSatsMaxPress = () => {
    setSatsInput(maxSats.toString());
  };

  // Unified accessors
  const isEmpty = isBtc ? satsIsEmpty : cashIsEmpty;
  const numAmount = isBtc ? currentSats : (parseFloat(cashAmount) || 0);
  const feeAmount = numAmount * config.feeRate;

  // Track system keyboard — animate custom Keypad opacity in sync
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const keypadOpacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, (e) => {
      setIsKeyboardOpen(true);
      Animated.timing(keypadOpacity, { toValue: 0, duration: e.duration || 200, useNativeDriver: true }).start();
    });
    const hideSub = Keyboard.addListener(hideEvent, (e) => {
      setIsKeyboardOpen(false);
      Animated.timing(keypadOpacity, { toValue: 1, duration: e.duration || 200, useNativeDriver: true }).start();
    });
    return () => { showSub.remove(); hideSub.remove(); };
  }, []);

  const handlePaymentMethodSelect = (selection: PaymentMethodSelection) => {
    setSelectedPaymentMethod(selection.variant);
    setSelectedBrand(selection.brand);
    setSelectedLabel(selection.label);
    setIsModalVisible(false);
  };

  const handleSend = () => {
    setConfirmedAmount(isBtc ? satsInput : cashAmount);
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
      case "amountMemo":
        return (
          <FullscreenTemplate
            title={config.title}
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable={false}
            navVariant="step"
            disableAnimation
            keyboardAware
            footer={
              <ModalFooter
                type="default"
                modalVariant={isKeyboardOpen ? "keyboard" : "default"}
                primaryButton={
                  <Button
                    label={isEmpty ? "Continue" : `Continue · ${isBtc ? formatSatsInput(satsInput) : config.formatAmount(numAmount)}`}
                    hierarchy="primary"
                    size="md"
                    disabled={isEmpty || (assetType === "bitcoin" && memo.trim().length < 3)}
                    onPress={() => setFlowStack(prev => [...prev, "review"])}
                  />
                }
              />
            }
          >
            <EnterAmount>
              <View style={styles.content}>
                <Pressable onPress={() => Keyboard.dismiss()}>
                  <CurrencyInput
                    value={isBtc ? formatSatsInput(satsInput) : formatDisplayValue(cashAmount)}
                    topContextSlot={
                      isBtc ? (
                        satsToUsd(currentSats) ? (
                          <TopContext variant="btc" value={satsToUsd(currentSats)} />
                        ) : (
                          <TopContext variant="empty" />
                        )
                      ) : (
                        <TopContext variant="empty" />
                      )
                    }
                    bottomContextSlot={
                      isBtc ? (
                        <BottomContext
                          variant="maxButton"
                          maxAmount={formatMaxBtc()}
                          onMaxPress={handleSatsMaxPress}
                        />
                      ) : (
                        <BottomContext
                          variant="paymentMethod"
                          paymentMethodVariant={selectedPaymentMethod}
                          paymentMethodBrand={selectedBrand}
                          paymentMethodLabel={selectedLabel}
                          onPaymentMethodPress={() => setIsModalVisible(true)}
                        />
                      )
                    }
                  />
                </Pressable>

                <TextField
                  placeholder={assetType === "bitcoin" ? "BTC address or invoice" : "Add a memo (optional)"}
                  value={memo}
                  onChangeText={setMemo}
                />
              </View>

              <Animated.View style={[{ opacity: keypadOpacity }, isKeyboardOpen && { height: 0, overflow: "hidden" }]} pointerEvents={isKeyboardOpen ? "none" : "auto"}>
                <Keypad
                  onNumberPress={isBtc ? handleSatsNumberPress : cashNumberPress}
                  onDecimalPress={isBtc ? undefined : cashDecimalPress}
                  onBackspacePress={isBtc ? handleSatsBackspacePress : cashBackspacePress}
                  disableDecimal={isBtc || hasDecimal}
                />
              </Animated.View>
            </EnterAmount>
          </FullscreenTemplate>
        );
      case "review":
        return (
          <FullscreenTemplate
            title="Review & send"
            onLeftPress={() => setFlowStack(prev => prev.slice(0, -1))}
            scrollable={false}
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label={`Send ${isBtc ? formatSatsInput(satsInput) : config.formatAmount(numAmount)}`}
                    hierarchy="primary"
                    size="md"
                    onPress={handleSend}
                  />
                }
              />
            }
          >
            <View style={styles.reviewContent}>
              <View style={styles.reviewHeader}>
                <FoldText type="header-sm" style={styles.reviewAmount}>
                  {isBtc ? formatSatsInput(satsInput) : config.formatAmount(numAmount)}
                </FoldText>
                {isBtc && (
                  <FoldText type="body-sm" style={styles.reviewRecipient}>
                    {satsToUsd(currentSats)}
                  </FoldText>
                )}
                {assetType === "bitcoin" && (
                  <FoldText type="body-md" style={styles.reviewRecipient} numberOfLines={1}>
                    To: {memo.slice(0, 24)}...
                  </FoldText>
                )}
              </View>

              <Divider />

              <ReceiptDetails>
                <ListItemReceipt label="Amount" value={isBtc ? formatSatsInput(satsInput) : config.formatAmount(numAmount)} />
                <ListItemReceipt label={`Fee · ${config.feeLabel}`} value={isBtc ? formatSatsInput(String(Math.round(feeAmount))) : config.formatAmount(feeAmount)} />
                {!isBtc && <ListItemReceipt label="From" value={selectedLabel || "Account"} />}
                {assetType === "bitcoin" && <ListItemReceipt label="To" value={`${memo.slice(0, 16)}...`} />}
                <ListItemReceipt label="Delivery" value={assetType === "bitcoin" ? "~10 min" : "Within minutes"} />
              </ReceiptDetails>

              <Divider />

              {/* Irreversibility warning */}
              <View style={styles.warningBox}>
                <FoldText type="body-sm" style={styles.warningText}>
                  Money sent with {assetType === "bitcoin" ? "Bitcoin" : "this method"} cannot be reversed. Only send to people you trust.
                </FoldText>
              </View>

              {/* Instant delivery note */}
              <View style={styles.deliveryNote}>
                <FoldText type="body-sm" style={styles.deliveryText}>
                  {assetType === "bitcoin"
                    ? "Transaction will be broadcast to the Bitcoin network."
                    : "Recipient will typically receive funds within minutes."}
                </FoldText>
              </View>
            </View>
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  // Success — instant delivery confirmation
  if (showSuccess) {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    return (
      <FullscreenTemplate
        title={isBtc ? "Bitcoin sent" : "Money sent"}
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
            {isBtc ? formatSatsInput(confirmedAmount) : config.formatAmount(numConfirmed)}
          </FoldText>
          {isBtc && (
            <FoldText type="body-md" style={styles.successRecipient}>
              {satsToUsd(parseInt(confirmedAmount, 10) || 0)}
            </FoldText>
          )}
          {assetType === "bitcoin" && (
            <FoldText type="body-md" style={styles.successRecipient} numberOfLines={1}>
              Sent to {memo.slice(0, 24)}...
            </FoldText>
          )}
          <View style={styles.successDelivery}>
            <FoldText type="body-sm" style={styles.successDeliveryText}>
              {assetType === "bitcoin"
                ? "Broadcasted to the network"
                : "Delivered within minutes"}
            </FoldText>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    gap: spacing["300"],
  },

  // Review
  reviewContent: {
    flex: 1,
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
  reviewRecipient: {
    color: colorMaps.face.secondary,
  },
  warningBox: {
    backgroundColor: colorMaps.object.primary.subtle.default,
    borderRadius: 8,
    padding: spacing["400"],
  },
  warningText: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
  deliveryNote: {
    alignItems: "center",
  },
  deliveryText: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
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
  successRecipient: {
    color: colorMaps.face.secondary,
  },
  successDelivery: {
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 20,
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["200"],
  },
  successDeliveryText: {
    color: colorMaps.face.secondary,
  },
});
