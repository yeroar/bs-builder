import React from "react";
import { View, StyleSheet } from "react-native";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import { FoldText } from "../../../components/Primitives/FoldText";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { BitcoinStrokeIcon } from "../../../components/Icons/BitcoinStrokeIcon";
import { ScanIcon } from "../../../components/Icons/ScanIcon";
import { XCloseIcon } from "../../../components/Icons/XCloseIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface WalletAddress {
  address: string;
  displayAddress: string;
  onPress?: () => void;
}

export interface BtcWalletSearchProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onClearPress?: () => void;
  onScanPress?: () => void;
  walletAddresses?: WalletAddress[];
}

export default function BtcWalletSearch({
  value = "",
  onChangeText,
  onClearPress,
  onScanPress,
  walletAddresses = [
    { address: "3NC53Da...9wff5IY", displayAddress: "3NC53Da...9wff5IY" },
  ],
}: BtcWalletSearchProps) {
  const isPopulated = value.length > 0;

  return (
    <View style={styles.container}>
      <TextField
        state={isPopulated ? "filled" : "default"}
        placeholder="Placeholder"
        value={value}
        onChangeText={onChangeText}
        trailingSlot={
          isPopulated ? (
            <FoldPressable onPress={onClearPress}>
              <XCloseIcon width={16} height={16} color={colorMaps.face.secondary} />
            </FoldPressable>
          ) : (
            <FoldPressable onPress={onScanPress}>
              <ScanIcon width={16} height={16} color={colorMaps.face.secondary} />
            </FoldPressable>
          )
        }
      />

      {isPopulated && walletAddresses.length > 0 && (
        <View style={styles.results}>
          <FoldText type="body-md-bold" style={styles.resultsLabel}>
            Wallet addresses
          </FoldText>

          <View style={styles.addressList}>
            {walletAddresses.map((wallet, index) => (
              <ListItem
                key={index}
                variant="feature"
                leadingSlot={
                  <IconContainer
                    variant="default-stroke"
                    size="lg"
                    icon={<BitcoinStrokeIcon width={20} height={20} color={colorMaps.face.primary} />}
                  />
                }
                title={wallet.displayAddress}
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
                onPress={wallet.onPress}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingTop: spacing["500"],
    paddingHorizontal: spacing["500"],
    paddingBottom: spacing["300"],
    gap: spacing["800"],
  },
  results: {
    gap: spacing["200"],
  },
  resultsLabel: {
    color: colorMaps.face.secondary,
  },
  addressList: {},
});
