import React, { forwardRef } from "react";
import TransactionSuccess, { TransactionSuccessRef, EnterAnimation } from "../../Templates/Success/TransactionSuccess";
import FoldPageViewHeader from "../../../components/Navigation/TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../components/Inputs/CurrencyInput/CurrencyInput";

export interface BtcBuySuccessProps {
  amount?: string;
  satsEquivalent?: string;
  onClose?: () => void;
  /** Animation type for entering */
  enterAnimation?: EnterAnimation;
  /** Footer content provided by the flow */
  footer?: React.ReactNode;
  testID?: string;
}

const BtcBuySuccess = forwardRef<TransactionSuccessRef, BtcBuySuccessProps>(({
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
          title="Purchase submitted"
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
        topContextVariant="btc"
        topContextValue={satsEquivalent}
        bottomContextVariant="none"
      />
    </TransactionSuccess>
  );
});

export default BtcBuySuccess;
