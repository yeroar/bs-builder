import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import DirectToBitcoinIcon from "../../../components/Icons/DirectToBitcoinIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface DirectDepositSlotProps {
  routingNumber?: string;
  accountNumber?: string;
  bankName?: string;
  onDirectToBitcoinPress?: () => void;
  onRoutingPress?: () => void;
  onAccountPress?: () => void;
  onBankNamePress?: () => void;
  onTermsPress?: () => void;
}

export default function DirectDepositSlot({
  routingNumber = "000 000 000",
  accountNumber = "0000 0000 0000",
  bankName = "Sutton bank",
  onDirectToBitcoinPress,
  onRoutingPress,
  onAccountPress,
  onBankNamePress,
  onTermsPress,
}: DirectDepositSlotProps) {
  return (
    <View style={styles.container}>
      {/* Header + Direct to bitcoin */}
      <View style={styles.headerSection}>
        <PrimaryHeader
          noPaddings
          header="Direct deposit"
          body="Deposit your paycheck as cash or bitcoin."
        />
        <ListItem
          variant="feature"
          leadingSlot={
            <IconContainer
              variant="default-stroke"
              size="lg"
              icon={<DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />}
            />
          }
          title="Direct-to-bitcoin"
          secondaryText="Fee free direct deposits into BTC"
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onDirectToBitcoinPress}
        />
      </View>

      <Divider />

      {/* Account details */}
      <View style={styles.detailsSection}>
        <ListItem
          variant="feature"
          title="Routing number"
          secondaryText={routingNumber}
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onRoutingPress}
        />
        <ListItem
          variant="feature"
          title="Account number"
          secondaryText={accountNumber}
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onAccountPress}
        />
        <ListItem
          variant="feature"
          title="Bank name"
          secondaryText={bankName}
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
          onPress={onBankNamePress}
        />
      </View>

      <Divider />

      {/* Important information */}
      <View style={styles.infoSection}>
        <FoldText type="body-sm" style={styles.infoTitle}>
          Important information
        </FoldText>
        <View style={styles.bulletList}>
          <FoldText type="body-sm" style={styles.bulletText}>
            {"\u2022  "}If asked, specify this account as a "checking" account.
          </FoldText>
          <FoldText type="body-sm" style={styles.bulletText}>
            {"\u2022  "}If an address is required, use: 1 South Main St, Attica, OH 44807.
          </FoldText>
          <FoldText type="body-sm" style={styles.bulletText}>
            {"\u2022  "}The deposit limit for the Fold Card is $15,000 per day (UTC).
          </FoldText>
          <FoldText type="body-sm" style={styles.bulletText}>
            {"\u2022  "}The maximum balance on your Fold Card is $30,000
          </FoldText>
          <FoldText type="body-sm" style={styles.bulletText}>
            {"\u2022  "}Direct deposit settings may take two pay cycles to update (check with your payroll admin).
          </FoldText>
        </View>
      </View>

      {/* Legal */}
      <View style={styles.legalSection}>
        <FoldText type="body-sm" style={styles.legalText}>
          The Fold Card is issued by Sutton Bank, Member FDIC, pursuant to a license from Visa U.S.A.. Inc. Visa is a registered trademark of Visa, U.S.A., Inc. All other trademarks and service marks belong to their respective owners. Fold is a financial services platform and not a FDIC insured bank. If you have a Fold Card, accounts are subject to pass-through FDIC insurance up to $250,000 per ownership category, should Sutton Bank fail. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. Coverage limit is subject to aggregation of that accountholder's funds held at Sutton Bank. You can learn more at{" "}
          <FoldText
            type="body-sm-bold"
            style={styles.legalLink}
            onPress={onTermsPress}
          >
            Terms and Conditions
          </FoldText>
          .
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  headerSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    paddingBottom: spacing["500"],
    gap: spacing["600"],
  },
  detailsSection: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["500"],
  },
  infoSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    paddingBottom: spacing["800"],
    gap: spacing["200"],
  },
  infoTitle: {
    color: colorMaps.face.tertiary,
  },
  bulletList: {
    gap: spacing["50"],
  },
  bulletText: {
    color: colorMaps.face.tertiary,
  },
  legalSection: {
    backgroundColor: colorMaps.layer.primary,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    paddingBottom: spacing["1600"],
    paddingRight: spacing["1000"],
  },
  legalText: {
    color: colorMaps.face.tertiary,
  },
  legalLink: {
    color: colorMaps.face.primary,
    textDecorationLine: "underline",
  },
});
