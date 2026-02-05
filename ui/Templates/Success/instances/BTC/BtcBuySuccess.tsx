import React, { forwardRef } from "react";
import TransactionSuccess, { TransactionSuccessRef, EnterAnimation } from "../../TransactionSuccess";
import FoldPageViewHeader from "../../../../../components/Navigation/TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../../../components/CurrencyInput/CurrencyInput";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { colorMaps } from "../../../../../components/tokens";

export interface BtcBuySuccessProps {
  amount?: string;
  satsEquivalent?: string;
  actionLabel?: string;
  onClose?: () => void;
  onActionPress?: () => void;
  /** Animation type for entering */
  enterAnimation?: EnterAnimation;
  testID?: string;
}

const BtcBuySuccess = forwardRef<TransactionSuccessRef, BtcBuySuccessProps>(({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  actionLabel = "Done",
  onClose,
  onActionPress,
  enterAnimation = "slide",
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
      footer={
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
              label={actionLabel}
              hierarchy="inverse"
              size="md"
              onPress={onActionPress}
            />
          }
        />
      }
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
