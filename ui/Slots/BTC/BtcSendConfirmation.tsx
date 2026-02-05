import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";

export interface BtcSendConfirmationProps {
  satsAmount?: number;
  usdEquivalent?: string;
  bitcoinAddress?: string;
  feeSats?: number;
  feeUsd?: string;
  estimatedTime?: string;
  onConfirmPress?: () => void;
  testID?: string;
}

export default function BtcSendConfirmation({
  satsAmount = 10000000,
  usdEquivalent = "~$10,250.00",
  bitcoinAddress = "3NC53Da...9wff5iY",
  feeSats = 1000,
  feeUsd = "~$1.03",
  estimatedTime = "Arrives within 24hrs",
  onConfirmPress,
  testID,
}: BtcSendConfirmationProps) {
  const formatSats = (sats: number): string => {
    return `${sats.toLocaleString()} sats`;
  };

  const totalSats = satsAmount + feeSats;
  const totalUsdValue = parseFloat(usdEquivalent.replace(/[~$,]/g, '')) + parseFloat(feeUsd.replace(/[~$,]/g, ''));
  const totalUsd = `(~$${totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`;

  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={formatSats(satsAmount)}
          topContextSlot={<TopContext variant="btc" value={usdEquivalent} />}
          bottomContextSlot={<BottomContext variant="empty" />}
          testID={testID}
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt
            label="Bitcoin address"
            value={bitcoinAddress}
          />
          <ListItemReceipt
            label="Sending"
            value={formatSats(satsAmount)}
            hasDenominator
            denominator={`(${usdEquivalent})`}
          />
          <ListItemReceipt
            label="Fees"
            value={formatSats(feeSats)}
            hasDenominator
            denominator={`(${feeUsd})`}
          />
          <ListItemReceipt
            label="Total"
            value={formatSats(totalSats)}
            hasDenominator
            denominator={totalUsd}
          />
          <ListItemReceipt
            label="Estimated time"
            value={estimatedTime}
          />
        </ReceiptDetails>
      }
      footer={
        <ModalFooter
          modalVariant="default"
          primaryButton={
            <Button
              label="Confirm send"
              hierarchy="primary"
              size="md"
              onPress={onConfirmPress}
            />
          }
        />
      }
    />
  );
}
