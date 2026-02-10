import React from "react";
import GiftCardSuccess from "../../../Slots/GiftCard/GiftCardSuccess";
import ModalFooter from "../../../../components/Modals/ModalFooter";
import Button from "../../../../components/Primitives/Buttons/Button/Button";
import { SelectedCard } from "./GiftCardPurchaseFlow";

export interface GiftCardSuccessScreenProps {
  card: SelectedCard;
  amount: string;
  onDone: () => void;
}

export default function GiftCardSuccessScreen({
  card,
  amount,
  onDone,
}: GiftCardSuccessScreenProps) {
  return (
    <GiftCardSuccess
      brand={card.brand}
      brandLabel={card.title}
      amount={amount}
      onClose={onDone}
      onViewDetails={() => console.log("View details")}
      animated={false}
      footer={
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button
              label="Redeem"
              hierarchy="inverse"
              size="md"
              onPress={() => console.log("Redeem")}
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
    />
  );
}
