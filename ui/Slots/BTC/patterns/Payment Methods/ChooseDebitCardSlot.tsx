import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../../components/ListItem/PaymentMethod/ListItemPaymentMethod";
import ListItem from "../../../../../components/ListItem/ListItem";
import { IconContainer } from "../../../../../components/IconContainer";
import CreditCardIcon from "../../../../../components/icons/CreditCardIcon";
import PlusCircleIcon from "../../../../../components/icons/PlusCircleIcon";
import { ChevronRightIcon } from "../../../../../components/icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";

export interface DebitCard {
  id: string;
  name: string;
  lastFour: string;
  brand?: string;
}

export interface ChooseDebitCardSlotProps {
  debitCards?: DebitCard[];
  selectedCardId?: string;
  onSelectCard?: (card: DebitCard) => void;
  onAddDebitCard?: () => void;
  testID?: string;
}

export default function ChooseDebitCardSlot({
  debitCards = [
    { id: "1", name: "Visa", lastFour: "1234", brand: "visa" },
    { id: "2", name: "Mastercard", lastFour: "5678", brand: "mastercard" },
  ],
  selectedCardId,
  onSelectCard,
  onAddDebitCard,
  testID,
}: ChooseDebitCardSlotProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Choose debit card
      </FoldText>

      <View style={styles.list}>
        {debitCards.map((card) => (
          <ListItemPaymentMethod
            key={card.id}
            title={card.name}
            secondaryText={`•••• ${card.lastFour}`}
            icon={
              card.brand ? (
                <IconContainer brand={card.brand} size="lg" />
              ) : (
                <CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />
              )
            }
            trailingVariant="selectable"
            selected={card.id === selectedCardId}
            onPress={() => onSelectCard?.(card)}
          />
        ))}

        <ListItem
          variant="feature"
          title="Add a debit card"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<PlusCircleIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={
            <ChevronRightIcon width={24} height={24} color={colorMaps.face.tertiary} />
          }
          onPress={onAddDebitCard}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["800"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  list: {
    gap: spacing["none"],
  },
});
