import React from "react";
import { View, StyleSheet } from "react-native";
import BtcWalletSearchSlot, { WalletAddress } from "./BtcWalletSearchSlot";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
import InfoCircleIcon from "../../../components/Icons/InfoCircleIcon";
import SettingsIcon from "../../../components/Icons/SettingsIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface SendBitcoinSlotProps {
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onClearPress?: () => void;
  onScanPress?: () => void;
  onAddressSelect?: (address: string) => void;
  walletAddresses?: WalletAddress[];
}

export default function SendBitcoinSlot({
  searchValue = "",
  onSearchChange,
  onClearPress,
  onScanPress,
  onAddressSelect,
  walletAddresses = [
    {
      address: "3NC53DaHr9VY37dUgDQveG5qsTH9wff5IY",
      displayAddress: "3NC53Da...9wff5IY",
    },
  ],
}: SendBitcoinSlotProps) {
  const addressesWithHandlers = walletAddresses.map((w) => ({
    ...w,
    onPress: () => onAddressSelect?.(w.address),
  }));

  return (
    <View style={styles.container}>
      <BtcWalletSearchSlot
        value={searchValue}
        onChangeText={onSearchChange}
        onClearPress={onClearPress}
        onScanPress={onScanPress}
        walletAddresses={addressesWithHandlers}
      />

      <View style={styles.footer}>
        <Divider />
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <InfoCircleIcon width={24} height={24} color={colorMaps.face.secondary} />
            <FoldText type="body-sm" style={styles.infoText}>
              Bitcoin addresses only. Learn more.
            </FoldText>
          </View>
          <View style={styles.infoRow}>
            <SettingsIcon width={24} height={24} color={colorMaps.face.secondary} />
            <FoldText type="body-sm" style={styles.infoText}>
              500,000 sats is the recommended minimum for self-custody withdrawals. Learn more.
            </FoldText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
    justifyContent: "space-between",
  },
  footer: {},
  infoList: {
    gap: spacing["300"],
    paddingLeft: spacing["500"],
    paddingRight: spacing["800"],
    paddingBottom: spacing["1200"],
    paddingTop: spacing["600"],
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
  },
  infoText: {
    flex: 1,
    color: colorMaps.face.secondary,
  },
});
