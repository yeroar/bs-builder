import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionSuccess from "../../Templates/Success/TransactionSuccess";
import FoldPageViewHeader from "../../../components/Navigation/TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../components/Inputs/CurrencyInput/CurrencyInput";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { StarIcon } from "../../../components/Icons/StarIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface GiftCardSuccessProps {
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
  /** Footer content provided by the flow */
  footer?: React.ReactNode;
  /** Disable built-in animation when using external transition */
  animated?: boolean;
  testID?: string;
}

export default function GiftCardSuccess({
  brand,
  brandLabel = "Gift card",
  amount = "$100",
  onClose,
  onFavorite,
  onViewDetails,
  footer,
  animated = true,
  testID,
}: GiftCardSuccessProps) {
  return (
    <TransactionSuccess
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
      footer={footer}
      testID={testID}
    >
      <CurrencyInput
        value={amount}
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
    </TransactionSuccess>
  );
}

const styles = StyleSheet.create({
  viewDetailsContainer: {
    marginTop: -spacing["400"],
  },
});
