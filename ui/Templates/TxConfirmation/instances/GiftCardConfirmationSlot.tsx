import React from "react";
import { View, StyleSheet } from "react-native";
import TxConfirmation from "../TxConfirmation";
import { FoldText } from "../../../../components/Primitives/FoldText";
import { CurrencyInput } from "../../../../components/CurrencyInput";
import { PmSelectorVariant } from "../../../../components/CurrencyInput/PmSelector";
import Divider from "../../../../components/Primitives/Divider/Divider";
import ListItem from "../../../../components/DataDisplay/ListItem/ListItem";
import ReceiptDetails from "../../../../components/DataDisplay/ListItem/Receipt/ReceiptDetails";
import ListItemReceipt from "../../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import IconContainer from "../../../../components/Primitives/IconContainer/IconContainer";
import { GiftIcon } from "../../../../components/Icons/GiftIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../components/tokens";

export interface GiftCardConfirmationSlotProps {
  brand?: string;
  brandLabel?: string;
  amount?: string;
  satsEquivalent?: string;
  bitcoinPrice?: string;
  purchaseAmount?: string;
  feePercentage?: string;
  feeAmount?: string;
  feeSatsEquivalent?: string;
  maxAmount?: string;
  paymentMethodVariant?: PmSelectorVariant;
  paymentMethodLabel?: string;
  onPaymentMethodPress?: () => void;
  onSendAsGiftPress?: () => void;
  /** Recipient name for gift */
  recipientName?: string;
  /** Recipient phone for gift */
  recipientPhone?: string;
  disclaimer?: string;
  /** Optional children to render (for Figma Code Connect) */
  children?: React.ReactNode;
}

const DEFAULT_DISCLAIMER = `[Brand] is not a sponsor of the rewards or otherwise affiliated with Fold, Inc. The logos and other identifying marks attached are trademarks of and owned by each represented company and/or its affiliates. Please visit each company's website for additional terms and conditions. Fold cannot provide refunds on purchased gift cards.`;

export default function GiftCardConfirmationSlot({
  brand,
  brandLabel = "[Giftcard]",
  amount = "$20",
  satsEquivalent = "~₿0",
  bitcoinPrice = "$100,000.00",
  purchaseAmount = "$99.00",
  feePercentage = "1%",
  feeAmount = "$12.50",
  feeSatsEquivalent = "10,946 sats",
  maxAmount = "$100.00",
  paymentMethodVariant = "cardAccount",
  paymentMethodLabel = "cardAccount 1234",
  onPaymentMethodPress,
  onSendAsGiftPress,
  recipientName,
  recipientPhone,
  disclaimer = DEFAULT_DISCLAIMER,
  children,
}: GiftCardConfirmationSlotProps) {
  // Build recipient description
  const hasRecipient = recipientName && recipientPhone;
  const recipientDescription = hasRecipient
    ? `${recipientName} at ${recipientPhone}`
    : "Add a recipient";
  return (
    <TxConfirmation>
      {/* Currency Input Section */}
      <View style={styles.currencySection}>
        <CurrencyInput
          value={amount}
          topContextVariant="giftcard"
          topContextValue={brandLabel}
          topContextLeadingIcon={brand ? <IconContainer brand={brand} size="xs" /> : undefined}
          bottomContextVariant="paymentMethod"
          maxAmount={maxAmount}
          paymentMethodVariant={paymentMethodVariant}
          paymentMethodLabel={paymentMethodLabel}
          onPaymentMethodPress={onPaymentMethodPress}
        />
      </View>

      <Divider />

      {/* Receipt Details */}
      <View style={styles.detailsSection}>
        <ReceiptDetails>
          <ListItemReceipt label="Location" value={bitcoinPrice} hasDenominator={false} />
          <ListItemReceipt label="Total" value={purchaseAmount} hasDenominator={false} />
          <ListItemReceipt label={`Rewards • ${feePercentage}`} value={feeAmount} denominator={feeSatsEquivalent} />
        </ReceiptDetails>

        <Divider />

        {/* Send as Gift Option */}
        <ListItem
          variant="feature"
          title="Send as gift"
          secondaryText={recipientDescription}
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<GiftIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onSendAsGiftPress}
        />

        {/* Disclaimer */}
        <FoldText type="body-sm" style={styles.disclaimer}>
          {disclaimer}
        </FoldText>
      </View>
    </TxConfirmation>
  );
}

const styles = StyleSheet.create({
  currencySection: {
    alignItems: "center",
    paddingHorizontal: spacing["400"],
  },
  detailsSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    paddingBottom: spacing["500"],
    gap: spacing["600"],
  },
  disclaimer: {
    color: colorMaps.face.tertiary,
  },
});
