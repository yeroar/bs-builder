import React from "react";
import TxConfirmation from "../../Templates/TxConfirmation/TxConfirmation";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";
import ReceiptDetails from "../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../components/Primitives/Divider/Divider";
import { formatSats } from "../../../components/utils/formatWithCommas";

export interface BtcAutoStackConfirmationProps {
  /** Sats amount to display */
  satsAmount?: number;
  /** USD equivalent */
  usdEquivalent?: string;
  /** Payment method variant */
  paymentMethodVariant?: PmSelectorVariant;
  /** Payment method brand */
  paymentMethodBrand?: string;
  onPaymentMethodPress?: () => void;
  /** BTC amount type */
  btcAmountType?: string;
  /** Current BTC price */
  currentBtcPrice?: string;
  /** Recurring price type */
  recurringPriceType?: string;
  /** Start date/time */
  startingDate?: string;
  /** Total purchase amount */
  totalPurchase?: string;
  /** Total purchase in sats */
  totalPurchaseSats?: string;
  /** Fee percentage label */
  feePercentage?: string;
  /** Fee amount */
  feeAmount?: string;
  /** Total cost */
  totalCost?: string;
  testID?: string;
}

export default function BtcAutoStackConfirmation({
  satsAmount = 10000000,
  usdEquivalent = "~$10,250.00",
  paymentMethodVariant = "foldAccount",
  paymentMethodBrand,
  onPaymentMethodPress,
  btcAmountType = "Varies",
  currentBtcPrice = "$100,000.00",
  recurringPriceType = "Market price",
  startingDate = "9:00 AM Day, Mon DD",
  totalPurchase = "$100.00",
  totalPurchaseSats = "100,000 sats",
  feePercentage = "0%",
  feeAmount = "$0.00",
  totalCost = "$100.00",
  testID,
}: BtcAutoStackConfirmationProps) {
  return (
    <TxConfirmation
      currencyInput={
        <CurrencyInput
          value={formatSats(satsAmount, { approximate: false })}
          topContextSlot={<TopContext variant="btc" value={usdEquivalent} />}
          bottomContextVariant="paymentMethod"
          paymentMethodVariant={paymentMethodVariant}
          paymentMethodBrand={paymentMethodBrand}
          onPaymentMethodPress={onPaymentMethodPress}
          testID={testID}
        />
      }
      receiptDetails={
        <ReceiptDetails>
          <ListItemReceipt label="Amount of BTC" value={btcAmountType} />
          <ListItemReceipt label="Current BTC price" value={currentBtcPrice} />
          <ListItemReceipt label="Recurring BTC price" value={recurringPriceType} />
          <ListItemReceipt label="Starting" value={startingDate} />
          <Divider />
          <ListItemReceipt
            label="Total bitcoin purchase"
            value={totalPurchase}
            hasDenominator
            denominator={totalPurchaseSats}
            denominatorLayout="vertical"
          />
          <ListItemReceipt label={`Fees • ${feePercentage}`} value={feeAmount} />
          <ListItemReceipt label="Total cost" value={totalCost} />
        </ReceiptDetails>
      }
    />
  );
}
