import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../components/DataDisplay/ListItem/PaymentMethod/ListItemPaymentMethod";
import ListItem from "../../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../../components/Primitives/IconContainer";
import { BankIcon } from "../../../../components/Icons/BankIcon";
import CreditCardIcon from "../../../../components/Icons/CreditCardIcon";
import InfoCircleIcon from "../../../../components/Icons/InfoCircleIcon";
import { ChevronRightIcon } from "../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../components/tokens";

export type PaymentCardOption = "debitCard" | "cashBalance" | "bankAccount";

export interface ChoosePaymentCardProps {
  cashBalance?: string;
  bankName?: string;
  bankLastFour?: string;
  cardLastFour?: string;
  selectedOption?: PaymentCardOption;
  onSelectOption?: (option: PaymentCardOption) => void;
  onAddBankAccount?: () => void;
  testID?: string;
}

export default function ChoosePaymentCard({
  cashBalance = "$n.nn",
  bankName = "Wells Fargo",
  bankLastFour = "0823",
  cardLastFour = "1234",
  selectedOption,
  onSelectOption,
  onAddBankAccount,
  testID,
}: ChoosePaymentCardProps) {
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
