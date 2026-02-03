import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../../components/DataDisplay/ListItem/PaymentMethod/ListItemPaymentMethod";
import ListItem from "../../../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../../../components/Primitives/IconContainer";
import { BankIcon } from "../../../../../components/Icons/BankIcon";
import InfoCircleIcon from "../../../../../components/Icons/InfoCircleIcon";
import { ChevronRightIcon } from "../../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";

export interface BankAccount {
  id: string;
  name: string;
  lastFour: string;
}

export interface ChooseBankAccountSlotProps {
  bankAccounts?: BankAccount[];
  selectedAccountId?: string;
  onSelectAccount?: (account: BankAccount) => void;
  onAddBankAccount?: () => void;
  testID?: string;
}

export default function ChooseBankAccountSlot({
  bankAccounts = [
    { id: "1", name: "Wells Fargo", lastFour: "0823" },
    { id: "2", name: "Chase", lastFour: "1234" },
  ],
  selectedAccountId,
  onSelectAccount,
  onAddBankAccount,
  testID,
}: ChooseBankAccountSlotProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Choose bank account
      </FoldText>

      <View style={styles.list}>
        {bankAccounts.map((account) => (
          <ListItemPaymentMethod
            key={account.id}
            title={account.name}
            secondaryText={`•••• ${account.lastFour}`}
            icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
            trailingVariant="selectable"
            selected={account.id === selectedAccountId}
            onPress={() => onSelectAccount?.(account)}
          />
        ))}

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
            <ChevronRightIcon width={24} height={24} color={colorMaps.face.tertiary} />
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
