import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../../components/tokens";

export interface BitcoinAddressSlotProps {
  address?: string;
}

export default function BitcoinAddressSlot({
  address = "bc1qmv2 nzxla2s 2hfa06l\nm0s9gq7 wycfqtv rvlx6gj",
}: BitcoinAddressSlotProps) {
  // Split address into parts for styling: first chunk bold, middle dim, last chunk bold
  const parts = address.replace(/\n/g, " ").split(" ");
  const first = parts[0];
  const last = parts[parts.length - 1];
  const middle = parts.slice(1, -1).join(" ");

  return (
    <View style={styles.container}>
      <FoldText type="header-md" style={styles.title}>
        Your bitcoin address
      </FoldText>

      <View style={styles.addressBox}>
        <FoldText type="body-md" style={styles.addressText}>
          <FoldText type="body-md-bold" style={styles.addressBold}>{first} </FoldText>
          <FoldText type="body-md" style={styles.addressDim}>{middle} </FoldText>
          <FoldText type="body-md-bold" style={styles.addressBold}>{last}</FoldText>
        </FoldText>
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
  addressBox: {
    backgroundColor: colorMaps.object.secondary.default,
    borderRadius: radius.md,
    padding: spacing["500"],
    alignItems: "center",

  },
  addressText: {
    textAlign: "center",
    lineHeight: 32,
    fontFamily: "Geist Mono",
    letterSpacing: 0.16,
  },
  addressBold: {
    color: colorMaps.face.primary,
    fontFamily: "Geist Mono",
  },
  addressDim: {
    color: colorMaps.face.secondary,
    fontFamily: "Geist Mono",
  },
});
