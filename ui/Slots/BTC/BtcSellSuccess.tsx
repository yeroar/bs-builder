import React, { forwardRef } from "react";
import TransactionSuccess, { TransactionSuccessRef, EnterAnimation } from "../../Templates/Success/TransactionSuccess";
import FoldPageViewHeader from "../../../components/Navigation/TopNav/FoldPageViewHeader";
import { CurrencyInput, TopContext } from "../../../components/Inputs/CurrencyInput";

export interface BtcSellSuccessProps {
  amount?: string;
  satsEquivalent?: string;
  onClose?: () => void;
  /** Animation type for entering */
  enterAnimation?: EnterAnimation;
  /** Footer content provided by the flow */
  footer?: React.ReactNode;
  testID?: string;
}

const BtcSellSuccess = forwardRef<TransactionSuccessRef, BtcSellSuccessProps>(({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  onClose,
  enterAnimation = "slide",
  footer,
  testID,
}, ref) => {
  return (
    <TransactionSuccess
      ref={ref}
      enterAnimation={enterAnimation}
      header={
        <FoldPageViewHeader
          title="Bitcoin sold"
          leftIcon="x"
          onLeftPress={onClose}
          variant="fullscreen"
          marginBottom={0}
        />
      }
      footer={footer}
      testID={testID}
    >
      <CurrencyInput
        value={amount}
        topContextSlot={<TopContext variant="btc" value={satsEquivalent} />}
      />
    </TransactionSuccess>
  );
});

export default BtcSellSuccess;
