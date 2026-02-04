import React, { forwardRef } from "react";
import TransactionSuccessSlot, { TransactionSuccessSlotRef, EnterAnimation } from "../../TransactionSuccessSlot";
import FoldPageViewHeader from "../../../../../components/Navigation/TopNav/FoldPageViewHeader";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import ModalFooter from "../../../../../components/modals/ModalFooter";

export interface BtcSellSuccessSlotProps {
  amount?: string;
  satsEquivalent?: string;
  onClose?: () => void;
  onActionPress?: () => void;
  /** Animation type for entering */
  enterAnimation?: EnterAnimation;
  testID?: string;
}

const BtcSellSuccessSlot = forwardRef<TransactionSuccessSlotRef, BtcSellSuccessSlotProps>(({
  amount = "$100",
  satsEquivalent = "~10,000 sats",
  onClose,
  onActionPress,
  enterAnimation = "slide",
  testID,
}, ref) => {
  return (
    <TransactionSuccessSlot
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
      footer={
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button
              label="Done"
              hierarchy="inverse"
              size="md"
              onPress={onClose}
            />
          }
        />
      }
      testID={testID}
    >
      <CurrencyInput
        value={amount}
        topContextSlot={<TopContext variant="btc" value={satsEquivalent} />}
        bottomContextSlot={
          <BottomContext variant="maxButton">
            <Button
              label="View details"
              hierarchy="secondary"
              size="xs"
              onPress={onActionPress}
            />
          </BottomContext>
        }
      />
    </TransactionSuccessSlot>
  );
});

export default BtcSellSuccessSlot;
