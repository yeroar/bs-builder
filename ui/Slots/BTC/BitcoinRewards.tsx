import React from "react";
import { View, StyleSheet } from "react-native";
import TransactionHeader from "../../../components/DataDisplay/Headers/TransactionHeader";
import { FoldText } from "../../../components/Primitives/FoldText";
import Divider from "../../../components/Primitives/Divider/Divider";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import { colorMaps, spacing } from "../../../components/tokens";

export interface BitcoinRewardsProps {
  amount?: string;
  sats?: string;
  lifetimeRewardsValue?: string;
  lifetimeRewardsDenominator?: string;
  appreciationValue?: string;
  performanceValue?: string;
}

export default function BitcoinRewards({
  amount = "$364.17",
  sats = "400,240 sats",
  lifetimeRewardsValue = "$720.42",
  lifetimeRewardsDenominator = "576,479 sats",
  appreciationValue = "$12,482.13 (+12%)",
  performanceValue = "$45.23 (+9.43%)",
}: BitcoinRewardsProps) {
  return (
    <View style={styles.container}>
      <TransactionHeader
        title="Bitcoin rewards"
        subheader={amount}
        footnote={sats}
        style={styles.header}
      />

      <View style={styles.body}>
        <FoldText type="body-md" style={styles.bodyText}>
          Your lifetime rewards, including pending (approximate) and completed amounts.
        </FoldText>
      </View>

      <Divider style={styles.div} />

      <View style={styles.details}>
        <ListItemReceipt
          label="Lifetime rewards"
          value={lifetimeRewardsValue}
          denominator={lifetimeRewardsDenominator}
          hasDenominator
          denominatorLayout="vertical"
        />
        <ListItemReceipt
          label="Bitcoin appreciation"
          value={appreciationValue}
        />
        <ListItemReceipt
          label="Performance"
          value={performanceValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  header: {
    paddingHorizontal: spacing['none'],
  },
  body: {
  },
  bodyText: {
    color: colorMaps.face.secondary,
  },
  div: {
    marginVertical: spacing[600],
  },
  details: {
  },
});
