import React from "react";
import ListItem from "../ListItem";
import { IconContainer } from "../../../Primitives/IconContainer";
import { ChevronRightIcon } from "../../../Icons/ChevronRightIcon";
import { CircleIcon } from "../../../Icons/CircleIcon";
import { CheckCircleIcon } from "../../../Icons/CheckCircleIcon";
import { colorMaps } from "../../../tokens";

export type TrailingVariant = "chevron" | "selectable";

export interface ListItemPaymentMethodProps {
  title: string;
  secondaryText: string;
  tertiaryText?: string;
  icon: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  showDivider?: boolean;
  trailingVariant?: TrailingVariant;
  selected?: boolean;
  testID?: string;
}

export default function ListItemPaymentMethod({
  title,
  secondaryText,
  tertiaryText,
  icon,
  onPress,
  disabled = false,
  showDivider = false,
  trailingVariant = "chevron",
  selected = false,
  testID,
}: ListItemPaymentMethodProps) {
  const renderTrailingSlot = () => {
    if (trailingVariant === "selectable") {
      return selected ? (
        <CheckCircleIcon width={20} height={20} color={colorMaps.face.primary} />
      ) : (
        <CircleIcon width={20} height={20} color={colorMaps.face.disabled} />
      );
    }
    return <ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />;
  };

  return (
    <ListItem
      variant="paymentMethod"
      title={title}
      secondaryText={secondaryText}
      tertiaryText={tertiaryText}
      leadingSlot={
        <IconContainer
          variant="default-fill"
          size="lg"
          icon={icon}
        />
      }
      trailingSlot={renderTrailingSlot()}
      onPress={onPress}
      disabled={disabled}
      showDivider={showDivider}
      testID={testID}
    />
  );
}
