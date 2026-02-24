/**
 * Approach M: DeFi Vault Style
 *
 * Crypto-native vault UX: select coin, set % of balance, confirm inline.
 * Key patterns:
 * - Full-screen coin picker with search (Fuse Select Coin)
 * - Amount entry with % presets and MAX button (Fuse Slider + MAX)
 * - Inline bottom sheet confirmation (KakaoBank)
 * - Success with upsell card (Cash App)
 *
 * Flow: SelectAsset → EnterAmount(% presets) → MiniModal(confirm) → Success(upsell)
 * Steps: 3 screens (2 + overlay)
 */
import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import EnterAmount from "../../../../Templates/EnterAmount/EnterAmount";
import useAmountInput from "../../../../Templates/EnterAmount/useAmountInput";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/Inputs/CurrencyInput";
import { Keypad } from "../../../../../components/Keypad";
import QuickBuyInput from "../../../../../components/Inputs/QuickBuyInput/QuickBuyInput";
import SearchBar from "../../../../../components/Inputs/SearchBar/SearchBar";
import ListItem from "../../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import MiniModal from "../../../../../components/Modals/MiniModal";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import ReceiptDetails from "../../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { BitcoinStrokeIcon } from "../../../../../components/Icons/BitcoinStrokeIcon";
import { ChevronRightIcon } from "../../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing, radius } from "../../../../../components/tokens";
import { AssetType } from "./assetConfig";

export interface DeFiVaultStyleFlowProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

interface CoinOption {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  balanceUsd: number;
}

const COINS: CoinOption[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", balance: "0.0482 BTC", balanceUsd: 4941 },
  { id: "eth", name: "Ethereum", symbol: "ETH", balance: "1.25 ETH", balanceUsd: 4375 },
  { id: "sol", name: "Solana", symbol: "SOL", balance: "32.5 SOL", balanceUsd: 4875 },
  { id: "usdc", name: "USD Coin", symbol: "USDC", balance: "2,500.00 USDC", balanceUsd: 2500 },
  { id: "avax", name: "Avalanche", symbol: "AVAX", balance: "120 AVAX", balanceUsd: 3600 },
  { id: "link", name: "Chainlink", symbol: "LINK", balance: "200 LINK", balanceUsd: 3400 },
];

const PERCENT_PRESETS = [
  { label: "25%", value: 25 },
  { label: "50%", value: 50 },
  { label: "75%", value: 75 },
  { label: "MAX", value: 100 },
];

export default function DeFiVaultStyleFlow({ assetType = "cash", onComplete, onClose }: DeFiVaultStyleFlowProps) {
  const [flowStack, setFlowStack] = useState<string[]>(["selectAsset"]);
  const [selectedCoin, setSelectedCoin] = useState<CoinOption | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPercent, setSelectedPercent] = useState<number | null>(null);
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [flowAmount, setFlowAmount] = useState("0");

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
  const feeRate = 0.003; // 0.3% vault fee
  const feeAmount = numAmount * feeRate;
  const receiveAmount = numAmount - feeAmount;

  const filteredCoins = searchQuery
    ? COINS.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : COINS;

  const handleSelectCoin = (coin: CoinOption) => {
    setSelectedCoin(coin);
    setSearchQuery("");
    setFlowStack(prev => [...prev, "enterAmount"]);
  };

  const handlePercentSelect = (percent: number) => {
    if (!selectedCoin) return;
    setSelectedPercent(percent);
    const usdValue = (selectedCoin.balanceUsd * percent) / 100;
    setAmount(usdValue.toFixed(2));
  };

  const handleContinue = () => {
    setFlowAmount(amount);
    setShowConfirmSheet(true);
  };

  const handleConfirm = () => {
    setShowConfirmSheet(false);
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
      case "selectAsset":
        return (
          <FullscreenTemplate
            title="Select asset"
            leftIcon="x"
            onLeftPress={() => setFlowStack([])}
            scrollable={true}
            disableAnimation
          >
            <View style={styles.selectContent}>
              <SearchBar
                placeholder="Search coins"
                value={searchQuery}
                onChange={setSearchQuery}
                autoFocus
              />
              <View style={styles.coinList}>
                {filteredCoins.map(coin => (
                  <ListItem
                    key={coin.id}
                    title={coin.name}
                    secondaryText={coin.balance}
                    leadingSlot={
                      <IconContainer
                        size="sm"
                        icon={<BitcoinStrokeIcon width={20} height={20} color={colorMaps.face.primary} />}
                      />
                    }
                    trailingSlot={
                      <View style={styles.coinTrailing}>
                        <FoldText type="body-sm" style={styles.coinUsd}>
                          ${coin.balanceUsd.toLocaleString()}
                        </FoldText>
                        <ChevronRightIcon width={16} height={16} color={colorMaps.face.tertiary} />
                      </View>
                    }
                    onPress={() => handleSelectCoin(coin)}
                  />
                ))}
              </View>
            </View>
          </FullscreenTemplate>
        );

      case "enterAmount":
        return (
          <FullscreenTemplate
            title={selectedCoin ? `Convert ${selectedCoin.symbol}` : "Enter amount"}
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
                {selectedCoin && (
                  <FoldText type="body-sm" style={styles.balanceLabel}>
                    Balance: ${selectedCoin.balanceUsd.toLocaleString()}
                  </FoldText>
                )}

                <QuickBuyInput
                  items={PERCENT_PRESETS}
                  selectedValue={selectedPercent}
                  onSelect={handlePercentSelect}
                  columns={4}
                />

                {!isEmpty && (
                  <View style={styles.receivePreview}>
                    <FoldText type="body-sm" style={styles.previewLabel}>You receive</FoldText>
                    <FoldText type="body-sm-bold" style={styles.previewValue}>
                      ${receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </FoldText>
                  </View>
                )}
              </View>

              <Keypad
                onNumberPress={(n) => { setSelectedPercent(null); handleNumberPress(n); }}
                onDecimalPress={() => { setSelectedPercent(null); handleDecimalPress(); }}
                onBackspacePress={() => { setSelectedPercent(null); handleBackspacePress(); }}
                disableDecimal={hasDecimal}
                actionBar
                actionLabel={isEmpty ? "Continue" : `Continue · $${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                actionDisabled={isEmpty}
                onActionPress={handleContinue}
              />
            </EnterAmount>
          </FullscreenTemplate>
        );

      default:
        return null;
    }
  };

  // Success with upsell
  if (showSuccess) {
    const numConfirmed = parseFloat(flowAmount) || 0;
    const fee = numConfirmed * feeRate;
    const received = numConfirmed - fee;
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
            ${received.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCoin?.symbol || ""}
          </FoldText>

          {/* Upsell card */}
          <View style={styles.upsellCard}>
            <FoldText type="body-sm-bold" style={styles.upsellTitle}>
              Set up auto-convert?
            </FoldText>
            <FoldText type="body-sm" style={styles.upsellText}>
              Automatically convert on a schedule to dollar-cost average.
            </FoldText>
            <Button label="Set up" hierarchy="tertiary" size="sm" onPress={() => {}} />
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

      {/* Inline confirmation sheet */}
      <Modal
        visible={showConfirmSheet}
        transparent
        animationType="none"
        onRequestClose={() => setShowConfirmSheet(false)}
      >
        <MiniModal
          variant="default"
          onClose={() => setShowConfirmSheet(false)}
          showHeader={false}
          footer={
            <ModalFooter
              variant="sideBySide"
              secondaryButton={
                <Button
                  label="Cancel"
                  hierarchy="secondary"
                  size="md"
                  onPress={() => setShowConfirmSheet(false)}
                />
              }
              primaryButton={
                <Button
                  label="Confirm"
                  hierarchy="primary"
                  size="md"
                  onPress={handleConfirm}
                />
              }
            />
          }
        >
          <View style={styles.sheetContent}>
            <FoldText type="header-sm" style={styles.sheetTitle}>
              Convert ${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}?
            </FoldText>

            <ReceiptDetails>
              <ListItemReceipt label="Asset" value={selectedCoin?.name || "—"} />
              <ListItemReceipt
                label="Amount"
                value={`$${numAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
              <ListItemReceipt label="Fee · 0.3%" value={`$${feeAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
              <ListItemReceipt
                label="You receive"
                value={`$${receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
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

  // Select asset
  selectContent: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["400"],
  },
  coinList: {
    gap: spacing["100"],
  },
  coinTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
  },
  coinUsd: {
    color: colorMaps.face.secondary,
  },

  // Enter amount
  amountContent: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    gap: spacing["400"],
  },
  balanceLabel: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
  receivePreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing["200"],
  },
  previewLabel: {
    color: colorMaps.face.tertiary,
  },
  previewValue: {
    color: colorMaps.face.positiveBold,
  },

  // Confirm sheet
  sheetContent: {
    gap: spacing["400"],
  },
  sheetTitle: {
    color: colorMaps.face.primary,
    textAlign: "center",
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
