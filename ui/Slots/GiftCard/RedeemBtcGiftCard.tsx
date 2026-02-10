import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import Divider from "../../../components/Primitives/Divider/Divider";
import { colorMaps, spacing } from "../../../components/tokens";

// Bitcoin gift card image
const btcGiftCardImage = require("../../../assets/btcGiftCard.png");

export interface RedeemBtcGiftCardSlotProps {
  cardNumber?: string;
  pin?: string;
  onCardNumberChange?: (value: string) => void;
  onPinChange?: (value: string) => void;
}

export default function RedeemBtcGiftCardSlot({
  cardNumber = "",
  pin = "",
  onCardNumberChange,
  onPinChange,
}: RedeemBtcGiftCardSlotProps) {
  return (
    <View style={styles.container}>
      {/* Gift Card Image */}
      <View style={styles.imageContainer}>
        <Image
          source={btcGiftCardImage}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      <Divider />

      {/* Header */}
      <View style={styles.header}>
        <FoldText type="header-md" style={styles.headerText}>
          Redeem a Bitcoin Gift Card
        </FoldText>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextField
          label="Card number"
          placeholder="Enter card number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={onCardNumberChange}
        />
        <TextField
          label="PIN"
          placeholder="Enter PIN"
          keyboardType="numeric"
          secureTextEntry
          value={pin}
          onChangeText={onPinChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingBottom: spacing["1600"],
  },
  imageContainer: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["600"],
  },
  cardImage: {
    width: "100%",
    height: 211,
    borderRadius: 12,
  },
  header: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["600"],
  },
  headerText: {
    color: colorMaps.face.primary,
  },
  form: {
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["200"],
    gap: spacing["400"],
  },
});
