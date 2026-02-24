/**
 * Approach P: Gift Card Purchase
 *
 * Inspired by: Revolut Donations flow (7-screen pattern)
 * Adapted for gift card purchasing: select amount → keypad → success.
 * Browse/discovery screen lives outside this approach.
 * Key patterns:
 * - Select amount with GiftCardTemplate (card variant) or PrimaryHeader (header variant)
 * - Preset amount grid ($10-$250) with custom option
 * - Keypad amount entry for custom amounts
 * - Success bottom sheet overlay
 *
 * Flow: SelectAmount → EnterAmount(keypad) → Confirm → Success(sheet)
 * Steps: 4 (3 screens + overlay)
 */
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import QuickBuyInput from "../../../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import PrimaryHeader from "../../../../../components/DataDisplay/Headers/PrimaryHeader";
import GiftCardTemplate from "../../../../../components/DataDisplay/GiftCardTemplate/GiftCardTemplate";
import Validation from "../../../../../components/Primitives/ValidationItems/Validation";
import ValidationGroup from "../../../../../components/Primitives/ValidationItems/ValidationGroup";
import ListItem from "../../../../../components/DataDisplay/ListItem/ListItem";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import Divider from "../../../../../components/Primitives/Divider/Divider";
import MiniModal from "../../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { RocketIcon } from "../../../../../components/Icons/RocketIcon";
import { GlobeIcon } from "../../../../../components/Icons/GlobeIcon";
import { StarIcon } from "../../../../../components/Icons/StarIcon";
import { GiftIcon } from "../../../../../components/Icons/GiftIcon";
import { ChevronRightIcon } from "../../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../../../../../components/tokens";
import { AssetType } from "./assetConfig";

export interface GiftCardPurchaseFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

interface GiftCardBrand {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  color: string;
  about: string;
  /** "card" = GiftCardTemplate visual, "header" = PrimaryHeader with validations */
  variant: "card" | "header";
  satsBack?: number;
  availability?: string;
}

const BRANDS: GiftCardBrand[] = [
  { id: "instacart", name: "Instacart", tagline: "Groceries delivered", emoji: "🥕", color: "#003D29", about: "Instacart gift cards let you order groceries and everyday essentials from your favourite local stores, delivered to your door in as fast as an hour.", variant: "card", satsBack: 4, availability: "Online" },
  { id: "uber", name: "Uber", tagline: "Rides & delivery", emoji: "🚗", color: "#000", about: "Uber gift cards work across Uber rides and Uber Eats for food delivery, available in hundreds of cities worldwide.", variant: "header", satsBack: 10, availability: "Online and in-store" },
  { id: "spotify", name: "Spotify", tagline: "Music for everyone", emoji: "🎵", color: "#1DB954", about: "Spotify gift cards give access to Premium music streaming with no ads, offline downloads, and millions of tracks.", variant: "header", satsBack: 6, availability: "Online" },
  { id: "netflix", name: "Netflix", tagline: "Stream the world", emoji: "🎬", color: "#E50914", about: "Netflix gift cards provide access to thousands of movies, TV shows, documentaries, and original content.", variant: "card", satsBack: 5, availability: "Online" },
  { id: "playstation", name: "PlayStation", tagline: "Play has no limits", emoji: "🎮", color: "#003791", about: "PlayStation Store gift cards let you buy games, add-ons, and subscriptions for your PlayStation console.", variant: "header", satsBack: 3, availability: "Online and in-store" },
];

const PRESET_AMOUNTS = [10, 20, 50, 100, 150, 250];

/** Pick card vs header variant based on asset type for demo */
const DEFAULT_BRAND_INDEX = { cash: 0, bitcoin: 1 } as const;

type FlowStep = "selectAmount" | "enterAmount" | "confirm";

export default function GiftCardPurchaseFlow({ assetType = "cash", onComplete, onClose }: GiftCardPurchaseFlowProps) {
  const brand = BRANDS[DEFAULT_BRAND_INDEX[assetType] ?? 0];
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["selectAmount"]);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
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

  const pushStep = (step: FlowStep) => setFlowStack(prev => [...prev, step]);
  const popStep = () => setFlowStack(prev => prev.slice(0, -1));

  const handlePresetSelect = (amt: number) => {
    setSelectedPreset(amt);
  };

  const handlePresetContinue = () => {
    if (selectedPreset) {
      setFlowAmount(selectedPreset.toString());
      pushStep("confirm");
    }
  };

  const handleCustomAmount = () => {
    setSelectedPreset(null);
    pushStep("enterAmount");
  };

  const handleKeypadConfirm = () => {
    setFlowAmount(amount);
    pushStep("confirm");
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
      // ── Screen 1: Select Amount ──
      // Two visual variants matching Figma: "card" (GiftCardTemplate) or "header" (PrimaryHeader)
      case "selectAmount":
        return (
          <FullscreenTemplate
            title="Online and in-store"
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={false}
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Continue"
                    hierarchy="primary"
                    size="md"
                    disabled={!selectedPreset}
                    onPress={handlePresetContinue}
                  />
                }
              />
            }
          >
            <ScrollView
              style={styles.selectScroll}
              contentContainerStyle={styles.selectScrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Brand visual — card or header variant */}
              {brand.variant === "card" ? (
                <View style={styles.cardSection}>
                  <GiftCardTemplate
                    chipLabel={`Up to ${brand.satsBack || 5}% sats back`}
                    backgroundColor={brand.color}
                  />
                </View>
              ) : (
                <View style={styles.headerSection}>
                  <PrimaryHeader
                    iconSlot={
                      <View style={[styles.brandHeaderIcon, { backgroundColor: brand.color }]}>
                        <FoldText type="header-sm">{brand.emoji}</FoldText>
                      </View>
                    }
                    header={brand.name}
                    validationChildren={
                      <ValidationGroup>
                        <Validation
                          label={`Up to ${brand.satsBack || 5}% sats back`}
                          type="success"
                          leadingIcon={<RocketIcon width={24} height={24} />}
                        />
                        <Validation
                          label={brand.availability || "Online"}
                          type="success"
                          leadingIcon={<GlobeIcon width={24} height={24} />}
                        />
                      </ValidationGroup>
                    }
                    noPaddings
                  />
                </View>
              )}

              {/* Amount grid */}
              <View style={styles.amountSection}>
                <FoldText type="body-sm-bold" style={styles.amountTitle}>Select amount</FoldText>
                <QuickBuyInput
                  amounts={PRESET_AMOUNTS}
                  selectedAmount={selectedPreset}
                  onAmountSelect={handlePresetSelect}
                  columns={3}
                />
                <Pressable style={styles.customAmountBtn} onPress={handleCustomAmount}>
                  <FoldText type="body-sm" style={styles.customAmountText}>Custom amount</FoldText>
                </Pressable>
              </View>
            </ScrollView>
          </FullscreenTemplate>
        );

      // ── Screen 2: Enter Amount (keypad) ──
      case "enterAmount":
        return (
          <FullscreenTemplate
            title={`${brand.name} gift card`}
            onLeftPress={popStep}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            <EnterAmount>
              <View style={styles.keypadAmountContent}>
                <CurrencyInput
                  value={formatDisplayValue(amount)}
                  topContextSlot={<TopContext variant="empty" />}
                  bottomContextSlot={<BottomContext variant="empty" />}
                />
                {!isEmpty && (
                  <FoldText type="body-sm" style={styles.noFees}>No fees</FoldText>
                )}
              </View>

              <Keypad
                onNumberPress={handleNumberPress}
                onDecimalPress={handleDecimalPress}
                onBackspacePress={handleBackspacePress}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Confirm" : `Confirm · $${(parseFloat(amount) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                actionDisabled={isEmpty}
                onActionPress={handleKeypadConfirm}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );

      // ── Screen 3: Confirm Purchase ──
      // GiftCardConfirmation layout + Revolut-style action rows
      case "confirm": {
        const numAmount = parseFloat(flowAmount) || 0;
        const formattedAmount = `$${numAmount.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        const satsBack = brand.satsBack || 5;
        const rewardAmount = (numAmount * satsBack / 100).toFixed(2);
        const rewardSats = Math.round(numAmount * satsBack / 100 * 100000 / 100).toLocaleString();
        return (
          <FullscreenTemplate
            title="Buy gift card"
            onLeftPress={popStep}
            scrollable
            navVariant="step"
            disableAnimation
            footer={
              <ModalFooter
                type="default"
                primaryButton={
                  <Button
                    label="Confirm buy"
                    hierarchy="primary"
                    size="md"
                    onPress={() => setShowSuccess(true)}
                  />
                }
              />
            }
          >
            {/* Amount display */}
            <View style={styles.confirmCurrency}>
              <CurrencyInput
                value={formattedAmount}
                topContextVariant="giftcard"
                topContextValue={brand.name}
                topContextLeadingIcon={
                  <IconContainer brand={brand.id} size="xs" />
                }
                bottomContextVariant="paymentMethod"
                paymentMethodVariant="foldAccount"
                paymentMethodLabel="Cash balance"
              />
            </View>

            <Divider />

            {/* Receipt */}
            <View style={styles.confirmReceipt}>
              <ReceiptDetails>
                <ListItemReceipt label="Location" value={brand.availability || "Online"} />
                <ListItemReceipt label="Total" value={formattedAmount} />
                <ListItemReceipt label={`Rewards · ${satsBack}%`} value={`$${rewardAmount}`} denominator={`${rewardSats} sats`} />
              </ReceiptDetails>
            </View>

            <Divider />

            {/* Actions — Revolut "More ways" style */}
            <View style={styles.confirmActions}>
              <ListItem
                variant="feature"
                title="Add to favourites"
                secondaryText="Quick access next time"
                leadingSlot={
                  <IconContainer
                    variant="default-stroke"
                    size="lg"
                    icon={<StarIcon width={20} height={20} color={colorMaps.face.primary} />}
                  />
                }
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
              />
              <ListItem
                variant="feature"
                title="Send as gift"
                secondaryText="Add a recipient"
                leadingSlot={
                  <IconContainer
                    variant="default-stroke"
                    size="lg"
                    icon={<GiftIcon width={20} height={20} color={colorMaps.face.primary} />}
                  />
                }
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
              />
            </View>

            {/* Disclaimer */}
            <FoldText type="body-sm" style={styles.confirmDisclaimer}>
              {brand.name} is not a sponsor of the rewards or otherwise affiliated with Fold, Inc. Fold cannot provide refunds on purchased gift cards.
            </FoldText>
          </FullscreenTemplate>
        );
      }

      default:
        return null;
    }
  };

  const confirmedAmt = parseFloat(flowAmount) || 0;

  return (
    <View style={styles.container}>
      <ScreenStack
        stack={flowStack}
        renderScreen={renderScreen}
        animateInitial
        onEmpty={handleFlowEmpty}
      />

      {/* Success bottom sheet — same pattern as BottomSheetWithdrawFlow */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="none"
        onRequestClose={handleDone}
      >
        <MiniModal
          variant="default"
          onClose={handleDone}
          showHeader={false}
          footer={
            <ModalFooter
              type="default"
              primaryButton={
                <Button label="Done" hierarchy="primary" size="md" onPress={handleDone} />
              }
            />
          }
        >
          <View style={styles.successContent}>
            <CheckCircleIcon width={48} height={48} color={colorMaps.face.accentBold} />
            <FoldText type="header-sm" style={styles.successMsg}>
              {`Nice! You just bought a $${confirmedAmt} ${brand.name} gift card`}
            </FoldText>
            <FoldText type="body-sm" style={styles.successThanks}>
              Check your email for the code
            </FoldText>
          </View>
        </MiniModal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 200,
  },

  // ── Select Amount ──
  selectScroll: {
    flex: 1,
  },
  selectScrollContent: {
    paddingBottom: spacing["800"],
  },
  cardSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["300"],
  },
  headerSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["300"],
  },
  brandHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  amountSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["400"],
  },
  amountTitle: {
    color: colorMaps.face.primary,
  },
  customAmountBtn: {
    alignItems: "center",
    paddingVertical: spacing["300"],
  },
  customAmountText: {
    color: colorMaps.face.secondary,
  },

  // ── Keypad ──
  keypadAmountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    alignItems: "center",
    gap: spacing["200"],
  },
  noFees: {
    color: colorMaps.face.tertiary,
  },

  // ── Confirm ──
  confirmCurrency: {
    alignItems: "center",
    paddingHorizontal: spacing["500"],
  },
  confirmReceipt: {
    paddingHorizontal: spacing["500"],
  },
  confirmActions: {
    paddingHorizontal: spacing["500"],
  },
  confirmDisclaimer: {
    color: colorMaps.face.tertiary,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
  },

  // ── Success sheet ──
  successContent: {
    alignItems: "center",
    gap: spacing["300"],
  },
  successMsg: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
  successThanks: {
    color: colorMaps.face.secondary,
  },
});
