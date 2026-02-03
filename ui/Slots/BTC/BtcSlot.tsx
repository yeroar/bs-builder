import React from "react";
import { View, StyleSheet } from "react-native";
import ProductSurfacePrimary from "../../../components/ProductSurface/ProductSurfacePrimary";
import ProductSurfaceRewards from "../../../components/ProductSurface/ProductSurfaceRewards";
import ListItem from "../../../components/ListItem/ListItem";
import Button from "../../../components/Buttons/Button/Button";
import { IconContainer } from "../../../components/IconContainer";
import { FoldText } from "../../../components/Primitives/FoldText";
import ProgressVisualization from "../../../components/dataViz/ProgressVisualization";
import Divider from "../../../components/Divider/Divider";
import { colorMaps, spacing } from "../../../components/tokens";

// Icons
import ClockIcon from "../../../components/icons/ClockIcon";
import DirectToBitcoinIcon from "../../../components/icons/DirectToBitcoinIcon";
import SpotBuysIcon from "../../../components/icons/SpotBuysIcon";
import CoinsStackedIcon from "../../../components/icons/CoinsStackedIcon";
import { ChevronRightIcon } from "../../../components/icons/ChevronRightIcon";
import InfoCircleIcon from "../../../components/icons/InfoCircleIcon";

export interface BtcSlotProps {
  bitcoinAmount?: string;
  bitcoinAvailable?: string;
  rewardsAmount?: string;
  rewardsSats?: string;
  onBuyPress?: () => void;
  onSellPress?: () => void;
  onSwapPress?: () => void;
  onAutoStackPress?: () => void;
  onDirectToBitcoinPress?: () => void;
  onSeeAllTransactionsPress?: () => void;
  onRewardsPress?: () => void;
  transactions?: Array<{
    icon: "spot-buy" | "direct-to-bitcoin" | "auto-stack";
    title: string;
    subtitle: string;
    amount: string;
    date: string;
    onPress?: () => void;
  }>;
}

export default function BtcSlot({
  bitcoinAmount = "฿0.08",
  bitcoinAvailable = "฿0.07 available",
  rewardsAmount = "$21.00",
  rewardsSats = "18,434 sats",
  onBuyPress,
  onSellPress,
  onSwapPress,
  onAutoStackPress,
  onDirectToBitcoinPress,
  onSeeAllTransactionsPress,
  onRewardsPress,
  transactions = [
    {
      icon: "spot-buy",
      title: "Bitcoin buy",
      subtitle: "Today",
      amount: "$100.00",
      date: "Pending",
    },
    {
      icon: "direct-to-bitcoin",
      title: "Direct to bitcoin",
      subtitle: "Dec 17",
      amount: "$100.00",
      date: "100,000 sats",
    },
    {
      icon: "auto-stack",
      title: "Auto stack",
      subtitle: "Dec 17",
      amount: "$100.00",
      date: "100,000 sats",
    },
  ],
}: BtcSlotProps) {
  const getTransactionIcon = (iconType: string) => {
    switch (iconType) {
      case "spot-buy":
        return <SpotBuysIcon width={20} height={20} color={colorMaps.face.primary} />;
      case "direct-to-bitcoin":
        return <DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />;
      case "auto-stack":
        return <CoinsStackedIcon width={20} height={20} color={colorMaps.face.primary} />;
      default:
        return <SpotBuysIcon width={20} height={20} color={colorMaps.face.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Bitcoin Balance Section */}
      <ProductSurfacePrimary
        variant="expanded"
        label="Bitcoin"
        amount={bitcoinAmount}
        swapCurrency
        progressViz={
          <ProgressVisualization
            progress={100}
            leftText={bitcoinAvailable}
            leadingSlot={<InfoCircleIcon width={12} height={12} color={colorMaps.face.tertiary} />}
          />
        }
        primaryButton={
          <Button label="Buy" hierarchy="primary" size="sm" onPress={onBuyPress} />
        }
        secondaryButton={
          <Button label="Sell" hierarchy="primary" size="sm" onPress={onSellPress} />
        }
        tertiaryButton={
          <Button label="Swap" hierarchy="primary" size="sm" onPress={onSwapPress} />
        }
      />
      <Divider />

      {/* Rewards Section */}
      <ProductSurfaceRewards amount={rewardsAmount} onRewardsPress={onRewardsPress}>
        <ProgressVisualization progress={50} leftText={rewardsSats} />
      </ProductSurfaceRewards>

      <Divider />

      {/* Grow Your Stack Section */}
      <View style={styles.growStackSection}>
        <FoldText type="header-sm" style={styles.sectionTitle}>
          Grow your stack
        </FoldText>

        <View style={styles.listContainer}>
          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<ClockIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-stroke"
                size="lg"
              />
            }
            title="Auto stack"
            secondaryText="Set up recurring buys"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}

            onPress={onAutoStackPress}
          />

          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-stroke"
                size="lg"
              />
            }
            title="Direct to bitcoin"
            secondaryText="Fee free direct deposits"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}

            onPress={onDirectToBitcoinPress}
          />
        </View>
      </View>

      <Divider />

      {/* Transactions Section */}
      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <FoldText type="header-sm" style={styles.sectionTitle}>
            Transactions
          </FoldText>
        </View>

        <View style={styles.transactionsList}>
          {transactions.map((transaction, index) => (
            <ListItem
              key={index}
              variant="transaction"
              leadingSlot={
                <IconContainer
                  icon={getTransactionIcon(transaction.icon)}
                  variant="default-fill"
                  size="lg"
                />
              }
              title={transaction.title}
              secondaryText={transaction.subtitle}
              rightTitle={transaction.amount}
              rightSecondaryText={transaction.date}
              onPress={transaction.onPress}
            />
          ))}
        </View>

        <View style={styles.seeAllContainer}>
          <Button
            label="See all transactions"
            hierarchy="secondary"
            size="sm"
            style={{ width: "100%" }}
            onPress={onSeeAllTransactionsPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["none"],
  },
  growStackSection: {
    gap: spacing["500"],
    paddingVertical: spacing["800"],
    paddingHorizontal: spacing["500"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
  },
  listContainer: {
    gap: spacing["none"],
  },
  transactionsSection: {
    gap: spacing["none"],
  },
  transactionsHeader: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    paddingBottom: spacing["500"],
  },
  transactionsList: {
    paddingHorizontal: spacing["500"],
  },
  seeAllContainer: {
    padding: spacing["500"],
    alignItems: "center",
    width: "100%",
  },
});
