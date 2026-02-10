import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../../components/Primitives/FoldText";
import ListItemPaymentMethod from "../../../../components/DataDisplay/ListItem/PaymentMethod/ListItemPaymentMethod";
import { BankIcon } from "../../../../components/Icons/BankIcon";
import CreditCardRefreshIcon from "../../../../components/Icons/CreditCardRefreshIcon";
import { colorMaps, spacing } from "../../../../components/tokens";
import CreditCardIcon from "../../../../components/Icons/CreditCardIcon";

export interface AddPaymentProps {
  onBankAccountPress?: () => void;
  onDebitCardPress?: () => void;
  testID?: string;
}

export default function AddPayment({
  onBankAccountPress,
  onDebitCardPress,
  testID,
}: AddPaymentProps) {
  return (
    <View style={styles.container} testID={testID}>
      <FoldText type="header-md" style={styles.title}>
        Add payment method
      </FoldText>

      <View style={styles.list}>
        <ListItemPaymentMethod
          title="Bank account"
          secondaryText="Fund your purchase via ACH"
          tertiaryText="Deposit fee waved"
          icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
          onPress={onBankAccountPress}
        />

        <ListItemPaymentMethod
          title="Debit card"
          secondaryText="Link your debit card"
          tertiaryText="2.9% deposit fee ($0.30 min)"
          icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
          onPress={onDebitCardPress}
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
