import React, { forwardRef } from "react";
import TransactionSuccessSlot, { TransactionSuccessSlotRef } from "../TransactionSuccessSlot";
import FoldPageViewHeader from "../../../TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../CurrencyInput/CurrencyInput";
import Button from "../../../Buttons/Button/Button";
import ModalFooter from "../../../modals/ModalFooter";
import { FoldText } from "../../../Primitives/FoldText";
import { colorMaps } from "../../../tokens";

export interface BtcBuySuccessSlotProps {
  amount?: string;
  satsEquivalent?: string;
  actionLabel?: string;
  onClose?: () => void;
  onActionPress?: () => void;
  /** Disable built-in animation when using external animation */
  animated?: boolean;
  testID?: string;
}

const BtcBuySuccessSlot = forwardRef<TransactionSuccessSlotRef, BtcBuySuccessSlotProps>(({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  actionLabel = "Done",
  onClose,
  onActionPress,
  animated = true,
  testID,
}, ref) => {
  return (
    <TransactionSuccessSlot
      ref={ref}
      animated={animated}
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
        variant="transparent"
        topContextVariant="btc"
        topContextValue={satsEquivalent}
        bottomContextVariant="none"
      />
    </TransactionSuccessSlot>
  );
});

export default BtcBuySuccessSlot;
