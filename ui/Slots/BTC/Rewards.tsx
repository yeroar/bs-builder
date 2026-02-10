import React from "react";
import { View, StyleSheet } from "react-native";
import ProductSurfaceSecondary from "../../../components/DataDisplay/ProductSurface/ProductSurfaceSecondary";
import SecondaryHeader from "../../../components/DataDisplay/Headers/Secondary Header/SecondaryHeader";
import { ActionBar } from "../../../components/Primitives/Buttons/ActionBar";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import ProgressVisualization from "../../../components/dataViz/ProgressVisualization";
import NavBTCSolidIcon from "../../../components/Icons/NavBTCSolidIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface RewardsSlotProps {
  rewardsAmount?: string;
  rewardsSats?: string;
  pendingText?: string;
  disclaimer?: string;
  onSendPress?: () => void;
  onRewardsPress?: () => void;
  onSeeAllPress?: () => void;
  transactions?: Array<{
    title: string;
    subtitle: string;
    amount: string;
    sats: string;
    onPress?: () => void;
  }>;
}

export default function RewardsSlot({
  rewardsAmount = "$n.nn",
  rewardsSats = "n,nnn sats",
  pendingText = "Pending: ~15.10 of BTC",
  disclaimer = "{Legalese placeholder...}",
  onSendPress,
  onRewardsPress,
  onSeeAllPress,
  transactions = [
    { title: "Card reward", subtitle: "Pending", amount: "$0.60", sats: "105 sats" },
    { title: "Card reward", subtitle: "Today", amount: "$0.60", sats: "105 sats" },
    { title: "Card reward", subtitle: "Yesterday", amount: "< $0.01", sats: "10 sats" },
    { title: "Card reward", subtitle: "Dec 17", amount: "$0.33", sats: "302 sats" },
  ],
}: RewardsSlotProps) {
  return (
    <View style={styles.container}>
      <ProductSurfaceSecondary
        label="Rewards"
        amount={rewardsAmount}
        hasTitleIcon
        onPress={onRewardsPress}
        dataViz={
          <ProgressVisualization leftText={rewardsSats}>
            <></>
          </ProgressVisualization>
        }
        actionBar={
          <ActionBar>
            <Button label="Send" hierarchy="primary" size="sm" onPress={onSendPress} />
          </ActionBar>
        }
      />

      <View style={styles.transactions}>
        <SecondaryHeader
          title="Payouts"
          body={pendingText}
          disclaimer={disclaimer}
        />

        <View style={styles.transactionsList}>
          {transactions.map((transaction, index) => (
            <ListItem
              key={index}
              variant="transaction"
              leadingSlot={
                <IconContainer
                  variant="default-fill"
                  size="lg"
                  icon={<NavBTCSolidIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
              title={transaction.title}
              secondaryText={transaction.subtitle}
              rightTitle={transaction.amount}
              rightSecondaryText={transaction.sats}
              onPress={transaction.onPress}
            />
          ))}
        </View>
      </View>

      <View style={styles.seeAllContainer}>
        <Button
          label="See all"
          hierarchy="secondary"
          size="sm"
          style={{ width: "100%" }}
          onPress={onSeeAllPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  transactions: {},
  transactionsList: {
    paddingHorizontal: spacing["500"],
  },
  seeAllContainer: {
    padding: spacing["500"],
    alignItems: "center",
    width: "100%",
  },
});
