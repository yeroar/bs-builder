import React from "react";
import IconContainer from "../../../../components/Primitives/IconContainer/IconContainer";
import ValidationGroup from "../../../../components/Primitives/ValidationItems/ValidationGroup";
import Validation from "../../../../components/Primitives/ValidationItems/Validation";
import { RocketIcon } from "../../../../components/Icons/RocketIcon";
import { GlobeIcon } from "../../../../components/Icons/GlobeIcon";
import { colorMaps } from "../../../../components/tokens";
import { SelectedCard } from "./GiftCardPurchaseFlow";

export interface CardInput {
  brand: string;
  title: string;
  cashback: string;
  availability: string;
}

export function buildSelectedCard(card: CardInput): SelectedCard {
  return {
    brand: card.brand,
    title: card.title,
    logo: <IconContainer brand={card.brand} size="lg" />,
    offer: (
      <ValidationGroup>
        <Validation
          label={card.cashback}
          type="success"
          leadingIcon={<RocketIcon width={16} height={16} color={colorMaps.face.accentBold} />}
          labelColor={colorMaps.face.accentBold}
        />
        <Validation
          label={card.availability}
          type="success"
          leadingIcon={<GlobeIcon width={16} height={16} color={colorMaps.face.primary} />}
        />
      </ValidationGroup>
    ),
  };
}
