import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../Primitives/FoldText";
import ListItemPaymentMethod from "../../../../ListItem/PaymentMethod/ListItemPaymentMethod";
import ListItem from "../../../../ListItem/ListItem";
import { IconContainer } from "../../../../IconContainer";
import { BankIcon } from "../../../../icons/BankIcon";
import CreditCardIcon from "../../../../icons/CreditCardIcon";
import InfoCircleIcon from "../../../../icons/InfoCircleIcon";
import { ChevronRightIcon } from "../../../../icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../tokens";

export type PaymentMethodOption = "debitCard" | "cashBalance" | "bankAccount";

export interface ChoosePaymentMethodSlotProps {
  cashBalance?: string;
  bankName?: string;
  bankLastFour?: string;
  cardLastFour?: string;
  selectedOption?: PaymentMethodOption;
  onSelectOption?: (option: PaymentMethodOption) => void;
  onAddBankAccount?: () => void;
  testID?: string;
}

export default function ChoosePaymentMethodSlot({
  cashBalance = "$n.nn",
  bankName = "Wells Fargo",
  bankLastFour = "0823",
  cardLastFour = "1234",
  selectedOption,
  onSelectOption,
  onAddBankAccount,
  testID,
}: ChoosePaymentMethodSlotProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Choose payment method
      </FoldText>

      <View style={styles.list}>
        <ListItemPaymentMethod
          title="Debit card"
          secondaryText={`•••• ${cardLastFour}`}
          icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
          trailingVariant="selectable"
          selected={selectedOption === "debitCard"}
          onPress={() => onSelectOption?.("debitCard")}
        />

        <ListItemPaymentMethod
          title="Cash balance"
          secondaryText={cashBalance}
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          trailingVariant="selectable"
          selected={selectedOption === "cashBalance"}
          onPress={() => onSelectOption?.("cashBalance")}
        />

        <ListItemPaymentMethod
          title={bankName}
          secondaryText={`•••• ${bankLastFour}`}
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          trailingVariant="selectable"
          selected={selectedOption === "bankAccount"}
          onPress={() => onSelectOption?.("bankAccount")}
        />

        <ListItem
          variant="feature"
          title="Add a bank account"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<InfoCircleIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          trailingSlot={
            <ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />
          }
          onPress={onAddBankAccount}
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
