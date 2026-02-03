import React, { useState, useRef } from "react";
import { View, StyleSheet, Modal, Keyboard, LayoutAnimation, Platform, UIManager } from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import RootTemplate from "../Templates/RootTemplate";
import { FoldText } from "../../components/Primitives/FoldText";
import FoldPressable from "../../components/Primitives/FoldPressable";
import ProductSurfacePrimary from "../../components/ProductSurface/ProductSurfacePrimary";
import MarcomProductTile from "../../components/Marcom/MarcomProductTile";
import ListItem from "../../components/ListItem/ListItem";
import Button from "../../components/Buttons/Button/Button";
import { IconContainer } from "../../components/IconContainer";
import { colorMaps, spacing } from "../../components/tokens";

import { BellIcon } from "../../components/icons/BellIcon";
import { ClockIcon } from "../../components/icons/ClockIcon";
import SpinIcon from "../../components/icons/SpinIcon";
import DirectToBitcoinIcon from "../../components/icons/DirectToBitcoinIcon";
import NavBTCSolidIcon from "../../components/icons/NavBTCSolidIcon";
import InfoCircleIcon from "../../components/icons/InfoCircleIcon";
import ProgressBar from "../../components/dataViz/ProgressBar";
import ProgressVisualization from "../../components/dataViz/ProgressVisualization";
import TransactionList from "../../components/Transactions/TransactionList";
import MiniModal from "../../components/modals/MiniModal";
import ActivateDebitCardSlot from "../../components/modals/minimodalslots/ActivateDebitCardSlot";
import ActivationSuccessSlot from "../Slots/ActivationSuccessSlot";
import ModalFooter from "../../components/modals/ModalFooter";
import BankHomeSlot from "../Slots/BankHomeSlot";
import BtcSlot from "../Slots/BTC/BtcSlot";
import BtcBuyModalSlot, { BuyAmount } from "../Slots/BTC/BtcBuyModalSlot";
import BtcEnterAmount from "../Templates/EnterAmount/instances/BtcEnterAmount";
import BtcSellEnterAmount from "../Templates/EnterAmount/instances/BtcSellEnterAmount";
import ConfirmBuySlot from "../Templates/TxConfirmation/instances/ConfirmBuySlot";
import ConfirmSellSlot from "../Templates/TxConfirmation/instances/ConfirmSellSlot";
import SendBitcoinEnterAmount from "../Templates/EnterAmount/instances/SendBitcoinEnterAmount";
import SendBitcoinConfirmationSlot from "../Templates/TxConfirmation/instances/SendBitcoinConfirmationSlot";
import SendBitcoinSuccessSlot from "../Templates/Success/instances/SendBitcoinSuccessSlot";
import { CurrencyInput, BottomContext } from "../../components/CurrencyInput";
import AddPaymentSlot from "../Slots/BTC/patterns/Payment Methods/AddPaymentSlot";
import ChooseBankAccountSlot from "../Slots/BTC/patterns/Payment Methods/ChooseBankAccountSlot";
import ChooseDebitCardSlot from "../Slots/BTC/patterns/Payment Methods/ChooseDebitCardSlot";
import ChoosePaymentMethodFoldSlot from "../Slots/BTC/patterns/Payment Methods/ChoosePaymentMethodFoldSlot";
import ChoosePaymentMethodSlot from "../Slots/BTC/patterns/Payment Methods/ChoosePaymentMethodSlot";
import FullscreenTemplate, { FullscreenTemplateRef } from "../Templates/FullscreenTemplate";
import { TransactionSuccessSlotRef } from "../Templates/Success/TransactionSuccessSlot";
import ScreenStack from "../Templates/ScreenStack";
import { PmSelectorVariant } from "../../components/CurrencyInput/PmSelector";

type FlowType = "buy" | "sell" | "send";
type FlowStep = "enterAmount" | "confirm";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
}

export default function BankScreen({ onTabPress, onHistoryPress, onMenuPress }: BankScreenProps) {
  const [isActivateModalVisible, setIsActivateModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [isActivationSuccess, setIsActivationSuccess] = useState(false);
  const [showBtcSlot, setShowBtcSlot] = useState(false);
  const [isBuyModalVisible, setIsBuyModalVisible] = useState(false);
  const [selectedBuyAmount, setSelectedBuyAmount] = useState<BuyAmount>(null);

  // Unified buy/sell flow state
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);
  const [flowStack, setFlowStack] = useState<FlowStep[]>([]);
  const [showFlowOverlay, setShowFlowOverlay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [flowAmount, setFlowAmount] = useState("0");
  const [isPaymentMethodModalVisible, setIsPaymentMethodModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PmSelectorVariant>("null");
  const [modalStep, setModalStep] = useState<"initial" | "bankAccount" | "debitCard" | "foldAccount" | "cardAccount">("initial");
  // Temporary selection states within modal
  const [tempSelectedBankId, setTempSelectedBankId] = useState<string | undefined>();
  const [tempSelectedCardId, setTempSelectedCardId] = useState<string | undefined>();
  const [tempSelectedCardBrand, setTempSelectedCardBrand] = useState<string | undefined>();
  const [tempSelectedOption, setTempSelectedOption] = useState<string | undefined>();
  // Selected card brand for display
  const [selectedCardBrand, setSelectedCardBrand] = useState<string | undefined>();

  // Send flow state
  const [sendSatsAmount, setSendSatsAmount] = useState(0);

  const successScreenRef = useRef<TransactionSuccessSlotRef>(null);


  const isFormValid = cardNumber.length > 0 && cvv.length > 0;

  const handleOpenModal = () => {
    // Reset state when opening, not when closing
    setIsActivationSuccess(false);
    setCardNumber("");
    setCVV("");
    setIsActivateModalVisible(true);
  };

  const handleCloseModal = () => {
    Keyboard.dismiss();
    setIsActivateModalVisible(false);
  };

  const handleActivateCard = () => {
    console.log("Activating card:", { cardNumber, cvv });
    Keyboard.dismiss();
    // Small delay to let keyboard dismiss smoothly before showing success
    setTimeout(() => {
      // Configure spring animation for smooth layout transition
      LayoutAnimation.configureNext({
        duration: 400,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 0.7,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.7,
        },
      });
      setIsActivationSuccess(true);
    }, 150);
  };

  const handleOpenBtcScreen = () => {
    setShowBtcSlot(true);
  };

  const handleCloseBtcScreen = () => {
    setShowBtcSlot(false);
  };

  const handleOpenBuyModal = () => {
    setSelectedBuyAmount(null);
    setSelectedPaymentMethod("null");
    setIsBuyModalVisible(true);
  };

  const handleCloseBuyModal = () => {
    setIsBuyModalVisible(false);
  };

  // Unified flow handlers
  const handleOpenFlow = (type: FlowType) => {
    setActiveFlow(type);
    setFlowAmount("0");
    setShowFlowOverlay(true);

    if (type === "buy" && selectedBuyAmount && selectedBuyAmount !== "custom") {
      // Preset amount for buy - go directly to confirm
      const numericAmount = selectedBuyAmount.replace("$", "");
      setFlowAmount(numericAmount);
      setFlowStack(["confirm"]);
    } else {
      setFlowStack(["enterAmount"]);
    }
  };

  const handleContinueBuy = () => {
    console.log("Continuing with buy amount:", selectedBuyAmount);
    setIsBuyModalVisible(false);
    handleOpenFlow("buy");
  };

  const handleOpenSellFlow = () => {
    setSelectedPaymentMethod("null");
    handleOpenFlow("sell");
  };

  const handleOpenSendFlow = () => {
    setSendSatsAmount(0);
    setActiveFlow("send");
    setFlowStack(["enterAmount"]);
    setShowFlowOverlay(true);
  };

  const handleSendEnterAmountContinue = (sats: number) => {
    console.log("Send amount entered:", sats, "sats");
    setSendSatsAmount(sats);
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleFlowClose = () => {
    if (activeFlow === "sell") {
      // For sell, FullscreenTemplate handles animation, then we close directly
      // Hide overlay first to unmount ScreenStack before it can animate
      setShowFlowOverlay(false);
      setFlowStack([]);
      setActiveFlow(null);
    } else {
      setFlowStack([]);
    }
  };

  const handleFlowEmpty = () => {
    setShowFlowOverlay(false);
    setActiveFlow(null);
  };

  const handleEnterAmountContinue = (amount: string) => {
    console.log(`${activeFlow} amount entered:`, amount);
    setFlowAmount(amount);
    setFlowStack(prev => [...prev, "confirm"]);
  };

  const handleConfirmBack = () => {
    setFlowStack(prev => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    console.log(`${activeFlow} confirmed for:`, flowAmount);
    setFlowStack([]);
    setShowFlowOverlay(false);
    setShowSuccess(true);
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    setActiveFlow(null);
    setShowBtcSlot(true);
  };

  const handleSuccessActionPress = () => {
    console.log(`View ${activeFlow} details pressed`);
    setShowSuccess(false);
    setActiveFlow(null);
    setShowBtcSlot(true);
  };

  const handleOpenPaymentMethodModal = () => {
    // Reset to initial step when opening modal
    setModalStep("initial");
    setTempSelectedBankId(undefined);
    setTempSelectedCardId(undefined);
    setTempSelectedOption(undefined);
    setIsPaymentMethodModalVisible(true);
  };

  const handleClosePaymentMethodModal = () => {
    setIsPaymentMethodModalVisible(false);
  };

  // First step: user selects payment type from AddPaymentSlot
  const handleSelectBankAccountType = () => {
    console.log("Bank account type selected - showing bank accounts");
    setModalStep("bankAccount");
  };

  const handleSelectDebitCardType = () => {
    console.log("Debit card type selected - showing debit cards");
    setModalStep("debitCard");
  };

  // Final selections that close modal and update pill
  const handleFinalSelectBankAccount = (accountName?: string, lastFour?: string) => {
    console.log("Final bank account selected:", accountName, lastFour);
    setSelectedPaymentMethod("bankAccount");
    setIsPaymentMethodModalVisible(false);
  };

  const handleFinalSelectCashBalance = () => {
    console.log("Cash balance selected");
    setSelectedPaymentMethod("foldAccount");
    setIsPaymentMethodModalVisible(false);
  };

  const handleFinalSelectCreditCard = () => {
    console.log("Credit card selected");
    setSelectedPaymentMethod("cardAccount");
    setIsPaymentMethodModalVisible(false);
  };

  const handleFinalSelectDebitCard = () => {
    console.log("Debit card selected");
    setSelectedPaymentMethod("cardAccount");
    setIsPaymentMethodModalVisible(false);
  };

  const handleAddBankAccount = () => {
    console.log("Add bank account pressed");
    // Could navigate to add bank account flow
    setIsPaymentMethodModalVisible(false);
  };

  const handleAddDebitCard = () => {
    console.log("Add debit card pressed");
    // Could navigate to add debit card flow
    setIsPaymentMethodModalVisible(false);
  };

  // Handle confirming the selection in the modal
  const handleConfirmModalSelection = () => {
    switch (modalStep) {
      case "bankAccount":
        if (tempSelectedBankId) {
          setSelectedPaymentMethod("bankAccount");
          setIsPaymentMethodModalVisible(false);
        }
        break;
      case "debitCard":
        if (tempSelectedCardId) {
          setSelectedPaymentMethod("cardAccount");
          setSelectedCardBrand(tempSelectedCardBrand);
          setIsPaymentMethodModalVisible(false);
        }
        break;
      case "foldAccount":
        if (tempSelectedOption === "cashBalance") {
          setSelectedPaymentMethod("foldAccount");
        } else if (tempSelectedOption === "creditCard") {
          setSelectedPaymentMethod("cardAccount");
        }
        setIsPaymentMethodModalVisible(false);
        break;
      case "cardAccount":
        if (tempSelectedOption === "debitCard") {
          setSelectedPaymentMethod("cardAccount");
        } else if (tempSelectedOption === "cashBalance") {
          setSelectedPaymentMethod("foldAccount");
        } else if (tempSelectedOption === "bankAccount") {
          setSelectedPaymentMethod("bankAccount");
        }
        setIsPaymentMethodModalVisible(false);
        break;
    }
  };

  // Check if a selection has been made in current modal step
  const hasModalSelection = () => {
    switch (modalStep) {
      case "bankAccount":
        return !!tempSelectedBankId;
      case "debitCard":
        return !!tempSelectedCardId;
      case "foldAccount":
      case "cardAccount":
        return !!tempSelectedOption;
      default:
        return false;
    }
  };

  // Render appropriate modal content based on current modal step
  const renderPaymentMethodModalContent = () => {
    switch (modalStep) {
      case "bankAccount":
        return (
          <ChooseBankAccountSlot
            selectedAccountId={tempSelectedBankId}
            onSelectAccount={(account) => {
              setTempSelectedBankId(account.id);
            }}
            onAddBankAccount={handleAddBankAccount}
          />
        );
      case "debitCard":
        return (
          <ChooseDebitCardSlot
            selectedCardId={tempSelectedCardId}
            onSelectCard={(card) => {
              setTempSelectedCardId(card.id);
              setTempSelectedCardBrand(card.brand);
            }}
            onAddDebitCard={handleAddDebitCard}
          />
        );
      case "foldAccount":
        return (
          <ChoosePaymentMethodFoldSlot
            selectedOption={tempSelectedOption as any}
            onSelectOption={(option) => setTempSelectedOption(option)}
          />
        );
      case "cardAccount":
        return (
          <ChoosePaymentMethodSlot
            selectedOption={tempSelectedOption as any}
            onSelectOption={(option) => setTempSelectedOption(option)}
            onAddBankAccount={handleAddBankAccount}
          />
        );
      case "initial":
      default:
        return (
          <AddPaymentSlot
            onBankAccountPress={handleSelectBankAccountType}
            onDebitCardPress={handleSelectDebitCardType}
          />
        );
    }
  };

  // Render modal footer based on current step
  const renderModalFooter = () => {
    if (modalStep === "initial") {
      return <ModalFooter type="clean" />;
    }
    return (
      <ModalFooter
        type="default"
        primaryButton={
          <Button
            label="Continue"
            hierarchy="primary"
            size="md"
            disabled={!hasModalSelection()}
            onPress={handleConfirmModalSelection}
          />
        }
      />
    );
  };

  // Unified flow screen renderer
  const renderFlowScreen = (step: string) => {
    const numAmount = parseFloat(flowAmount) || 0;
    const btcPrice = 102500; // $102,500 per BTC
    const feeAmount = numAmount * 0.01;
    const netAmount = numAmount - feeAmount;
    const satsEquivalent = activeFlow === "buy"
      ? Math.round(numAmount * 100)
      : Math.round((numAmount / btcPrice) * 100000000);

    const formatWithCommas = (num: number, decimals = 2): string => {
      const fixed = num.toFixed(decimals);
      const [intPart, decPart] = fixed.split(".");
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formattedInt}.${decPart}`;
    };

    const formatSats = (sats: number): string => {
      const formatted = String(Math.round(sats)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `~${formatted} sats`;
    };

    const satsToUsd = (sats: number): number => {
      return (sats / 100000000) * btcPrice;
    };

    const formatUsdFromSats = (sats: number): string => {
      const usd = satsToUsd(sats);
      if (usd < 0.01) return "< $0.01";
      return `~$${usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const isBuy = activeFlow === "buy";
    const isSend = activeFlow === "send";
    const title = isBuy ? "Buy bitcoin" : isSend ? "Send bitcoin" : "Sell bitcoin";

    // Send flow screens
    if (isSend) {
      switch (step) {
        case "enterAmount":
          return (
            <FullscreenTemplate
              title={title}
              onLeftPress={handleFlowClose}
              scrollable={false}
              navVariant="start"
              disableAnimation={false}
            >
              <SendBitcoinEnterAmount
                maxSats={7000000} // 0.07 BTC
                btcPriceUsd={btcPrice}
                onContinue={handleSendEnterAmountContinue}
              />
            </FullscreenTemplate>
          );
        case "confirm":
          const sendFeeSats = Math.round(sendSatsAmount * 0.001); // 0.1% fee
          const sendUsdEquivalent = formatUsdFromSats(sendSatsAmount);
          const sendFeeUsd = formatUsdFromSats(sendFeeSats);
          return (
            <FullscreenTemplate
              title={title}
              onLeftPress={handleConfirmBack}
              scrollable={false}
              navVariant="step"
              disableAnimation
            >
              <SendBitcoinConfirmationSlot
                satsAmount={sendSatsAmount}
                usdEquivalent={sendUsdEquivalent}
                bitcoinAddress="3NC53Da...9wff5iY"
                feeSats={sendFeeSats}
                feeUsd={sendFeeUsd}
                estimatedTime="Arrives within 24hrs"
                onConfirmPress={handleConfirm}
              />
            </FullscreenTemplate>
          );
        default:
          return null;
      }
    }

    // Buy/Sell flow screens
    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate
            title={title}
            onLeftPress={handleFlowClose}
            scrollable={false}
            navVariant={isBuy ? "step" : "start"}
            disableAnimation={isBuy}
          >
            {isBuy ? (
              <BtcEnterAmount
                maxAmount="$500.00"
                actionLabel="Continue"
                onActionPress={handleEnterAmountContinue}
              />
            ) : (
              <BtcSellEnterAmount
                maxBtcAmount="0.07"
                btcPrice={btcPrice}
                actionLabel="Continue"
                onActionPress={handleEnterAmountContinue}
              />
            )}
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate
            title={isBuy ? "Confirm purchase" : title}
            onLeftPress={handleConfirmBack}
            scrollable={false}
            navVariant="step"
            disableAnimation
          >
            {isBuy ? (
              <ConfirmBuySlot
                amount={`$${formatWithCommas(numAmount)}`}
                satsEquivalent={formatSats(satsEquivalent)}
                bitcoinPrice="$100,000.00"
                purchaseAmount={`$${formatWithCommas(netAmount)}`}
                feePercentage="1%"
                feeAmount={`+$${formatWithCommas(feeAmount)}`}
                actionLabel="Confirm purchase"
                paymentMethodVariant={selectedPaymentMethod}
                paymentMethodBrand={selectedCardBrand}
                onPaymentMethodPress={handleOpenPaymentMethodModal}
                onConfirmPress={handleConfirm}
              />
            ) : (
              <ConfirmSellSlot
                amount={`$${formatWithCommas(numAmount)}`}
                satsEquivalent={formatSats(satsEquivalent)}
                bitcoinPrice="$100,000.00"
                saleAmount={`$${formatWithCommas(netAmount)}`}
                feePercentage="1%"
                feeAmount={`-$${formatWithCommas(feeAmount)}`}
                actionLabel="Confirm sell"
                onConfirmPress={handleConfirm}
              />
            )}
          </FullscreenTemplate>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <RootTemplate
        variant="root"
        activeTab="left"
        onTabPress={onTabPress}
        onLeftPress={onMenuPress}
        scrollable={true}
        homeSlot={
          <BankHomeSlot
            onActivateCard={handleOpenModal}
            onBitcoinPress={handleOpenBtcScreen}
            onBuyPress={handleOpenBuyModal}
            onSellPress={() => handleOpenFlow("sell")}
          />
        }
        rightComponents={[
          <FoldPressable key="clock" onPress={onHistoryPress}>
            <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>,
          <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
            <BellIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>
        ]}
      >

      </RootTemplate>

      <Modal
        visible={isActivateModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <MiniModal
          variant={isActivationSuccess ? "default" : "keyboard"}
          onClose={handleCloseModal}
          showHeader={false}
          footer={
            isActivationSuccess ? (
              <ModalFooter
                primaryButton={
                  <Button
                    label="Done"
                    hierarchy="primary"
                    onPress={handleCloseModal}
                  />
                }
              />
            ) : (
              <ModalFooter
                disclaimer={
                  <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                    Activate by phone: <FoldText type="body-sm" style={{ color: colorMaps.face.accentBold }}>1-833-904-2761</FoldText>
                  </FoldText>
                }
                primaryButton={
                  <Button
                    label="Activate card"
                    hierarchy="primary"
                    disabled={!isFormValid}
                    onPress={handleActivateCard}
                  />
                }
              />
            )
          }
        >
          {isActivationSuccess ? (
            <ActivationSuccessSlot />
          ) : (
            <ActivateDebitCardSlot
              cardNumber={cardNumber}
              cvv={cvv}
              onCardNumberChange={setCardNumber}
              onCVVChange={setCVV}
            />
          )}
        </MiniModal>
      </Modal>

      {/* Bitcoin Screen with slide-up animation (handled by FullscreenTemplate) */}
      {showBtcSlot && (
        <FullscreenTemplate onLeftPress={handleCloseBtcScreen}>
          <BtcSlot
            onBuyPress={handleOpenBuyModal}
            onSellPress={handleOpenSellFlow}
            onSendPress={handleOpenSendFlow}
            onAutoStackPress={() => console.log("Auto stack pressed")}
            onDirectToBitcoinPress={() => console.log("Direct to bitcoin pressed")}
            onSeeAllTransactionsPress={() => console.log("See all transactions pressed")}
            onRewardsPress={() => console.log("Rewards pressed")}
          />
        </FullscreenTemplate>
      )}

      {/* Buy Amount Selection Modal - accessible from both home and BTC screens */}
      <Modal
        visible={isBuyModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseBuyModal}
      >
        <MiniModal
          variant="default"
          onClose={handleCloseBuyModal}
          showHeader={false}
          footer={
            <ModalFooter
              primaryButton={
                <Button
                  label="Continue"
                  hierarchy="primary"
                  disabled={selectedBuyAmount === null}
                  onPress={handleContinueBuy}
                />
              }
            />
          }
        >
          <BtcBuyModalSlot
            selectedAmount={selectedBuyAmount}
            onSelectAmount={setSelectedBuyAmount}
          />
        </MiniModal>
      </Modal>

      {/* Unified Buy/Sell Flow with ScreenStack */}
      {showFlowOverlay && (
        <>
          <View style={styles.buyFlowOverlay}>
            <ScreenStack
              stack={flowStack}
              renderScreen={renderFlowScreen}
              animateInitial={activeFlow === "buy"}
              onEmpty={handleFlowEmpty}
            />
          </View>

          {activeFlow === "buy" && (
            <Modal
              visible={isPaymentMethodModalVisible}
              transparent={true}
              animationType="none"
              onRequestClose={handleClosePaymentMethodModal}
            >
              <MiniModal
                variant="default"
                onClose={handleClosePaymentMethodModal}
                showHeader={false}
                footer={renderModalFooter()}
              >
                {renderPaymentMethodModalContent()}
              </MiniModal>
            </Modal>
          )}
        </>
      )}

      {/* Success Screen Overlay */}
      {showSuccess && activeFlow === "buy" && (
        <FullscreenTemplate
          title="Purchase submitted"
          leftIcon="x"
          onLeftPress={handleSuccessDone}
          scrollable={false}
          variant="yellow"
          enterAnimation="fill"
        >
          <View style={styles.successContent}>
            <CurrencyInput
              value={`$${parseFloat(flowAmount).toFixed(2)}`}
              topContextVariant="btc"
              topContextValue={`~${Math.round(parseFloat(flowAmount) * 100).toLocaleString()} sats`}
              bottomContextVariant="none"
            />
          </View>
          <ModalFooter
            type="inverse"
            disclaimer={
              <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
                <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
                  up to 14 days
                </FoldText>
                {" "}from purchase to unlock.
              </FoldText>
            }
            primaryButton={
              <Button
                label="Done"
                hierarchy="inverse"
                size="md"
                onPress={handleSuccessDone}
              />
            }
          />
        </FullscreenTemplate>
      )}

      {showSuccess && activeFlow === "sell" && (
        <FullscreenTemplate
          title="Bitcoin sold"
          leftIcon="x"
          onLeftPress={handleSuccessDone}
          scrollable={false}
          variant="yellow"
          enterAnimation="fill"
        >
          <View style={styles.successContent}>
            <CurrencyInput
              value={`$${parseFloat(flowAmount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              topContextVariant="btc"
              topContextValue={`~${Math.round((parseFloat(flowAmount) / 100000) * 100000000).toLocaleString()} sats`}
              bottomContextSlot={
                <BottomContext variant="maxButton">
                  <Button
                    label="View details"
                    hierarchy="secondary"
                    size="xs"
                    onPress={handleSuccessActionPress}
                  />
                </BottomContext>
              }
            />
          </View>
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button
                label="Done"
                hierarchy="inverse"
                size="md"
                onPress={handleSuccessDone}
              />
            }
          />
        </FullscreenTemplate>
      )}

      {showSuccess && activeFlow === "send" && (
        <FullscreenTemplate
          title="Send initiated"
          leftIcon="x"
          onLeftPress={handleSuccessDone}
          scrollable={false}
          variant="yellow"
          enterAnimation="fill"
        >
          <SendBitcoinSuccessSlot
            satsAmount={sendSatsAmount}
            usdEquivalent={`~$${((sendSatsAmount / 100000000) * 102500).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            onDone={handleSuccessDone}
            onViewDetails={handleSuccessActionPress}
          />
        </FullscreenTemplate>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing["600"],
  },
  headerIcon: {
    padding: spacing["100"],
  },
  section: {
    gap: spacing["200"],
  },
  checklistSection: {
    paddingHorizontal: spacing["400"],
    gap: spacing["400"],
  },
  sectionHeader: {
    color: colorMaps.face.primary,
    marginBottom: spacing["200"],
  },
  successContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
  buyFlowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 300,
  },
});
