import React from "react";
import { View, StyleSheet, Image } from "react-native";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import Footnote from "../../../components/Inputs/footnote/Footnote";
import Divider from "../../../components/Primitives/Divider/Divider";
import { InfoCircleIcon } from "../../../components/Icons/InfoCircleIcon";
import { ShieldIcon } from "../../../components/Icons/ShieldIcon";
import { CopyIcon } from "../../../components/Icons/CopyIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { FoldText } from "../../../components/Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../../components/tokens";

export interface ReceiveBitcoinProps {
  address?: string;
  qrImageUri?: string;
  onCopyPress?: () => void;
  onViewDetailsPress?: () => void;
}

export default function ReceiveBitcoin({
  address = "bc1qmv2...rvlx6gj",
  qrImageUri,
  onCopyPress,
  onViewDetailsPress,
}: ReceiveBitcoinProps) {
  return (
    <View style={styles.container}>
      {/* QR + Address section */}
      <View style={styles.topSection}>
        {/* QR Code */}
        <View style={styles.qrContainer}>
          {qrImageUri ? (
            <Image source={{ uri: qrImageUri }} style={styles.qrImage} resizeMode="cover" />
          ) : (
            <View style={styles.qrPlaceholder} />
          )}
        </View>

        {/* Address field */}
        <TextField
          state="filled"
          placeholder={address}
          editable={false}
          trailingSlot={
            <FoldPressable onPress={onCopyPress}>
              <CopyIcon width={20} height={20} color={colorMaps.face.primary} />
            </FoldPressable>
          }
          footer={
            <Footnote
              type="info"
              message="View details"
              leadingSlot={null}
              trailingSlot={<InfoCircleIcon width={12} height={12} color={colorMaps.face.tertiary} />}
              onPress={onViewDetailsPress}
            />
          }
        />
      </View>

      {/* Bottom info section */}
      <View style={styles.bottomSection}>
        <Divider />

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <InfoCircleIcon width={16} height={16} color={colorMaps.face.secondary} />
            <FoldText type="body-sm" style={styles.infoText}>
              Fold only accepts bitcoin at this address. Sending other assets will result in permanent loss of funds.
            </FoldText>
          </View>

          <View style={styles.infoRow}>
            <ShieldIcon width={16} height={16} color={colorMaps.face.secondary} />
            <FoldText type="body-sm" style={styles.infoText}>
              For your security, a new wallet address may be generated after each transaction settles.
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
  topSection: {
    gap: spacing["300"],
    paddingTop: spacing["500"],
    paddingHorizontal: spacing["500"],
    height: '100%',
  },
  qrContainer: {
    backgroundColor: colorMaps.special.offWhite,
    borderWidth: 1,
    borderColor: colorMaps.border.tertiary,
    borderRadius: radius.xl,
    padding: spacing["300"],
    alignItems: "center",
    justifyContent: "center",
    height: 335,
  },
  qrImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  qrPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colorMaps.special.offWhite,
    borderRadius: 12,
  },

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
