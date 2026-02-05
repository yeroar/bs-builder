import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionSuccess from "../../TransactionSuccess";
import FoldPageViewHeader from "../../../../../components/Navigation/TopNav/FoldPageViewHeader";
import CurrencyInput from "../../../../../components/CurrencyInput/CurrencyInput";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import FoldPressable from "../../../../../components/Primitives/FoldPressable";
import { StarIcon } from "../../../../../components/Icons/StarIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";

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
  /** Called when Redeem button is pressed */
  onRedeem?: () => void;
  /** Called when Done button is pressed */
  onDone?: () => void;
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
  onRedeem,
  onDone,
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
