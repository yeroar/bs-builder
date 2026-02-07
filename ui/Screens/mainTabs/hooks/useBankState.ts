import { useState, useCallback } from "react";
import { DirectToBitcoinConfig, AutoStackConfig } from "../../../Slots/BTC/BtcSlot";
import { RoundUpsConfig, RecurringDepositConfig } from "../../../Slots/Cash/CashSlot";
import { Multiplier } from "../../../Slots/Cash/RoundUpsSlot";

export type FlowType = "send" | "autoStack" | "deposit" | "withdraw" | "directToBitcoin" | "roundUps" | "redeem" | "authorizedUser" | "recurringDeposit" | "manageRecurringDeposit";

export interface BankState {
  // Automation configs
  directToBitcoinConfig: DirectToBitcoinConfig | undefined;
  roundUpsConfig: RoundUpsConfig | undefined;
  autoStackConfig: AutoStackConfig | undefined;
  recurringDepositConfig: RecurringDepositConfig | undefined;

  // Flow state
  activeFlow: FlowType | null;

  // Sub-screen state
  showBtcScreen: boolean;
  showCashScreen: boolean;
}

export interface BankActions {
  // Flow actions
  openFlow: (flow: FlowType) => void;
  closeFlow: () => void;

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
  handleRecurringDepositComplete: () => void;
  handleTurnOffAutoStack: () => void;
  handleTurnOffDirectToBitcoin: () => void;
  handleTurnOffRoundUps: () => void;
}

export default function useBankState(): [BankState, BankActions] {
  // Automation configs
  const [directToBitcoinConfig, setDirectToBitcoinConfig] = useState<DirectToBitcoinConfig | undefined>();
  const [roundUpsConfig, setRoundUpsConfig] = useState<RoundUpsConfig | undefined>();
  const [autoStackConfig, setAutoStackConfig] = useState<AutoStackConfig | undefined>();
  const [recurringDepositConfig, setRecurringDepositConfig] = useState<RecurringDepositConfig | undefined>();

  // Flow state
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);

  // Sub-screen state
  const [showBtcScreen, setShowBtcScreen] = useState(false);
  const [showCashScreen, setShowCashScreen] = useState(false);

  // Flow actions
  const openFlow = useCallback((flow: FlowType) => setActiveFlow(flow), []);
  const closeFlow = useCallback(() => setActiveFlow(null), []);

  // Sub-screen actions
  const openBtcScreen = useCallback(() => setShowBtcScreen(true), []);
  const closeBtcScreen = useCallback(() => setShowBtcScreen(false), []);
  const openCashScreen = useCallback(() => setShowCashScreen(true), []);
  const closeCashScreen = useCallback(() => setShowCashScreen(false), []);

  // Flow completion handlers
  const handleFlowComplete = useCallback(() => {
    const returnToCash = activeFlow === "deposit" || activeFlow === "withdraw" || activeFlow === "authorizedUser" || activeFlow === "recurringDeposit" || activeFlow === "manageRecurringDeposit";
    setActiveFlow(null);
    if (returnToCash) {
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

  const handleRecurringDepositComplete = useCallback(() => {
    setRecurringDepositConfig({ title: "Weekly deposit", secondaryText: "$100 every week" });
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
    recurringDepositConfig,
    activeFlow,
    showBtcScreen,
    showCashScreen,
  };

  const actions: BankActions = {
    openFlow,
    closeFlow,
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
    handleRecurringDepositComplete,
    handleTurnOffAutoStack,
    handleTurnOffDirectToBitcoin,
    handleTurnOffRoundUps,
  };

  return [state, actions];
}
