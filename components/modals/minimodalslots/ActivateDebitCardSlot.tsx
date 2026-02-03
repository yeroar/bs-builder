import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import TextField from "../../Input/TextContainer/TextField";
import { colorMaps, spacing } from "../../tokens";

export interface ActivateDebitCardSlotProps {
  cardNumber?: string;
  cvv?: string;
  onCardNumberChange?: (text: string) => void;
  onCVVChange?: (text: string) => void;
}

export default function ActivateDebitCardSlot({
  cardNumber = "",
  cvv = "",
  onCardNumberChange,
  onCVVChange,
}: ActivateDebitCardSlotProps) {
  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.title}>
        Activate card
      </FoldText>

      <View style={styles.inputGroup}>
        <TextField
          label="Card number"
          placeholder="Enter card number"
          value={cardNumber}
          onChangeText={onCardNumberChange}
          autoFocus={true}
          keyboardType="numeric"
        />

        <TextField
          label="CVV"
          placeholder="Enter CVV"
          value={cvv}
          onChangeText={onCVVChange}
          keyboardType="numeric"
          secureTextEntry={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  inputGroup: {
    gap: spacing["300"],
  },
});
