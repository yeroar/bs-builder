import React, { useState } from "react";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import CashSlot from "../../Slots/Cash/CashSlot";
import DirectDepositSlot from "../../Slots/Cash/DirectDepositSlot";
import { DepositFlow, WithdrawFlow, RoundUpsFlow, AuthorizedUserFlow } from "../flows";
import { RecurringDepositFlow } from "../flows/Cash";
import { RoundUpsConfig, RecurringDepositConfig } from "../../Slots/Cash/CashSlot";
import { Multiplier } from "../../Slots/Cash/RoundUpsSlot";
import { TransactionCategory } from "../../Slots/Transactions/TransactionsSlot";
import { FlowType, BankActions } from "./hooks/useBankState";

export interface CashRouterProps {
  visible: boolean;
  onClose: () => void;
  activeFlow: FlowType | null;
  flowKey: number;
  roundUpsConfig?: RoundUpsConfig;
  recurringDepositConfig?: RecurringDepositConfig;
  actions: BankActions;
  onHistoryPress: (category?: TransactionCategory) => void;
}

export default function CashRouter({
  visible,
  onClose,
  activeFlow,
  flowKey,
  roundUpsConfig,
  recurringDepositConfig,
  actions,
  onHistoryPress,
}: CashRouterProps) {
  const [showDirectDepositScreen, setShowDirectDepositScreen] = useState(false);

  return (
    <>
      {/* Cash Screen */}
      {visible && (
        <FullscreenTemplate onLeftPress={onClose} scrollable>
          <CashSlot
            onAddCashPress={() => actions.openFlow("deposit")}
            onWithdrawPress={() => actions.openFlow("withdraw")}
            onAuthorizedUsersPress={() => actions.openFlow("authorizedUser")}
            onRoundUpsPress={() => actions.openFlow("roundUps")}
            onDirectDepositPress={() => setShowDirectDepositScreen(true)}
            onRecurringDepositPress={() => actions.openFlow("manageRecurringDeposit")}
            onSeeAllTransactionsPress={() => onHistoryPress("cash")}
            recurringDepositConfig={recurringDepositConfig}
            roundUpsConfig={roundUpsConfig}
          />
        </FullscreenTemplate>
      )}

      {/* Direct Deposit Screen */}
      {showDirectDepositScreen && (
        <FullscreenTemplate
          onLeftPress={() => setShowDirectDepositScreen(false)}
          scrollable
        >
          <DirectDepositSlot
            onDirectToBitcoinPress={() => {
              setShowDirectDepositScreen(false);
              actions.openFlow("directToBitcoin");
            }}
          />
        </FullscreenTemplate>
      )}

      {/* Cash Flows */}
      {activeFlow === "deposit" && (
        <DepositFlow
          key={flowKey}
          onComplete={actions.handleFlowComplete}
          onRecurringDepositComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}
      {activeFlow === "withdraw" && (
        <WithdrawFlow
          key={flowKey}
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}
      {activeFlow === "authorizedUser" && (
        <AuthorizedUserFlow
          key={flowKey}
          onComplete={actions.handleFlowComplete}
          onClose={actions.closeFlow}
        />
      )}
      {activeFlow === "roundUps" && (
        <RoundUpsFlow
          key={flowKey}
          isFeatureActive={!!roundUpsConfig}
          initialMultiplier={roundUpsConfig?.multiplier as Multiplier}
          currentAmount={0}
          onComplete={actions.handleRoundUpsComplete}
          onClose={actions.closeFlow}
          onTurnOff={actions.handleTurnOffRoundUps}
        />
      )}
      {activeFlow === "recurringDeposit" && (
        <RecurringDepositFlow
          key={flowKey}
          mode="create"
          onComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}
      {activeFlow === "manageRecurringDeposit" && (
        <RecurringDepositFlow
          key={flowKey}
          mode="manage"
          startAtDetails
          onComplete={actions.handleRecurringDepositComplete}
          onClose={actions.closeFlow}
        />
      )}
    </>
  );
}
