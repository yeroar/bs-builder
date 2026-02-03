import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionSuccessSlot from "../TransactionSuccessSlot";
import FoldPageViewHeader from "../../../TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../CurrencyInput/CurrencyInput";
import IconContainer from "../../../IconContainer/IconContainer";
import ModalFooter from "../../../modals/ModalFooter";
import Button from "../../../Buttons/Button/Button";
import FoldPressable from "../../../Primitives/FoldPressable";
import { StarIcon } from "../../../icons/StarIcon";
import { colorMaps, spacing } from "../../../tokens";

export interface GiftCardSuccessScreenProps {
  /** Brand for the gift card icon */
  brand?: string;
  /** Brand label to display */
  brandLabel?: string;
  /** Amount purchased */
  amount?: string;
  /** Called when close button is pressed */
  onClose?: () => void;
  /** Called when favorite/star button is pressed */
  onFavorite?: () => void;
  /** Called when View details button is pressed */
  onViewDetails?: () => void;
  /** Called when Redeem button is pressed */
  onRedeem?: () => void;
  /** Called when Done button is pressed */
  onDone?: () => void;
  /** Disable built-in animation when using external transition */
  animated?: boolean;
  testID?: string;
}

export default function GiftCardSuccessScreen({
  brand,
  brandLabel = "Gift card",
  amount = "$100",
  onClose,
  onFavorite,
  onViewDetails,
  onRedeem,
  onDone,
  animated = true,
  testID,
}: GiftCardSuccessScreenProps) {
  return (
    <TransactionSuccessSlot
      animated={animated}
      header={
        <FoldPageViewHeader
          title="Gift card purchased"
          leftIcon="x"
          onLeftPress={onClose}
          rightComponent={
            <FoldPressable onPress={onFavorite}>
              <StarIcon width={24} height={24} color={colorMaps.face.tertiary} />
            </FoldPressable>
          }
          variant="fullscreen"
          marginBottom={0}
        />
      }
      footer={
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button
              label="Redeem"
              hierarchy="inverse"
              size="md"
              onPress={onRedeem}
            />
          }
          secondaryButton={
            <Button
              label="Done"
              hierarchy="secondary"
              size="md"
              onPress={onDone}
            />
          }
        />
      }
      testID={testID}
    >
      <CurrencyInput
        value={amount}
        variant="transparent"
        topContextVariant="giftcard"
        topContextLeadingIcon={brand ? <IconContainer brand={brand} size="xs" /> : undefined}
        topContextValue={brandLabel}
        bottomContextVariant="none"
      />

      <View style={styles.viewDetailsContainer}>
        <Button
          label="View details"
          hierarchy="secondary"
          size="sm"
          onPress={onViewDetails}
        />
      </View>
    </TransactionSuccessSlot>
  );
}

const styles = StyleSheet.create({
  viewDetailsContainer: {
    marginTop: -spacing["400"],
  },
});
