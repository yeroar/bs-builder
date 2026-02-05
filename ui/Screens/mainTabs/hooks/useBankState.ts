import { useState, useCallback } from "react";
import { DirectToBitcoinConfig, AutoStackConfig } from "../../../Slots/BTC/BtcSlot";
import { RoundUpsConfig } from "../../../Slots/Cash/CashSlot";
import { Multiplier } from "../../../Slots/Cash/RoundUpsSlot";

export type FlowType = "buy" | "sell" | "send" | "autoStack" | "deposit" | "directToBitcoin" | "roundUps" | "redeem";

export interface BankState {
  // Automation configs
  directToBitcoinConfig: DirectToBitcoinConfig | undefined;
  roundUpsConfig: RoundUpsConfig | undefined;
  autoStackConfig: AutoStackConfig | undefined;

  // Flow state
  activeFlow: FlowType | null;
  pendingBuyAmount: string | null;

  // Sub-screen state
  showBtcScreen: boolean;
  showCashScreen: boolean;
}

export interface BankActions {
  // Flow actions
  openFlow: (flow: FlowType) => void;
  closeFlow: () => void;

  // Buy flow
  openBuyFlow: (amount: string | null) => void;

  // Sub-screen actions
  openBtcScreen: () => void;
  closeBtcScreen: () => void;
  openCashScreen: () => void;
  closeCashScreen: () => void;

  // Config setters
  setDirectToBitcoinConfig: (config: DirectToBitcoinConfig | undefined) => void;
  setRoundUpsConfig: (config: RoundUpsConfig | undefined) => void;
  setAutoStackConfig: (config: AutoStackConfig | undefined) => void;

  // Flow completion handlers
  handleFlowComplete: () => void;
  handleAutoStackComplete: (config: AutoStackConfig) => void;
  handleDirectToBitcoinComplete: (percentage: number) => void;
  handleRoundUpsComplete: (multiplier: string) => void;
  handleTurnOffAutoStack: () => void;
  handleTurnOffDirectToBitcoin: () => void;
  handleTurnOffRoundUps: () => void;
}

export default function useBankState(): [BankState, BankActions] {
  // Automation configs
  const [directToBitcoinConfig, setDirectToBitcoinConfig] = useState<DirectToBitcoinConfig | undefined>();
  const [roundUpsConfig, setRoundUpsConfig] = useState<RoundUpsConfig | undefined>();
  const [autoStackConfig, setAutoStackConfig] = useState<AutoStackConfig | undefined>();

  // Flow state
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);
  const [pendingBuyAmount, setPendingBuyAmount] = useState<string | null>(null);

  // Sub-screen state
  const [showBtcScreen, setShowBtcScreen] = useState(false);
  const [showCashScreen, setShowCashScreen] = useState(false);

  // Flow actions
  const openFlow = useCallback((flow: FlowType) => setActiveFlow(flow), []);
  const closeFlow = useCallback(() => setActiveFlow(null), []);

  const openBuyFlow = useCallback((amount: string | null) => {
    setPendingBuyAmount(amount);
    setActiveFlow("buy");
  }, []);

  // Sub-screen actions
  const openBtcScreen = useCallback(() => setShowBtcScreen(true), []);
  const closeBtcScreen = useCallback(() => setShowBtcScreen(false), []);
  const openCashScreen = useCallback(() => setShowCashScreen(true), []);
  const closeCashScreen = useCallback(() => setShowCashScreen(false), []);

  // Flow completion handlers
  const handleFlowComplete = useCallback(() => {
    const wasDepositFlow = activeFlow === "deposit";
    setActiveFlow(null);
    if (wasDepositFlow) {
      setShowCashScreen(true);
    } else {
      setShowBtcScreen(true);
    }
  }, [activeFlow]);

  const handleAutoStackComplete = useCallback((config: AutoStackConfig) => {
    setAutoStackConfig(config);
    setActiveFlow(null);
    setShowBtcScreen(true);
  }, []);

  const handleDirectToBitcoinComplete = useCallback((percentage: number) => {
    setDirectToBitcoinConfig({ bitcoinPercent: percentage });
    setActiveFlow(null);
    setShowBtcScreen(true);
  }, []);

  const handleRoundUpsComplete = useCallback((multiplier: string) => {
    setRoundUpsConfig({ multiplier });
    setActiveFlow(null);
    setShowCashScreen(true);
  }, []);

  const handleTurnOffAutoStack = useCallback(() => {
    setAutoStackConfig(undefined);
    setActiveFlow(null);
    setShowBtcScreen(true);
  }, []);

  const handleTurnOffDirectToBitcoin = useCallback(() => {
    setDirectToBitcoinConfig(undefined);
    setActiveFlow(null);
    setShowBtcScreen(true);
  }, []);

  const handleTurnOffRoundUps = useCallback(() => {
    setRoundUpsConfig(undefined);
    setActiveFlow(null);
    setShowCashScreen(true);
  }, []);

  const state: BankState = {
    directToBitcoinConfig,
    roundUpsConfig,
    autoStackConfig,
    activeFlow,
    pendingBuyAmount,
    showBtcScreen,
    showCashScreen,
  };

  const actions: BankActions = {
    openFlow,
    closeFlow,
    openBuyFlow,
    openBtcScreen,
    closeBtcScreen,
    openCashScreen,
    closeCashScreen,
    setDirectToBitcoinConfig,
    setRoundUpsConfig,
    setAutoStackConfig,
    handleFlowComplete,
    handleAutoStackComplete,
    handleDirectToBitcoinComplete,
    handleRoundUpsComplete,
    handleTurnOffAutoStack,
    handleTurnOffDirectToBitcoin,
    handleTurnOffRoundUps,
  };

  return [state, actions];
}
