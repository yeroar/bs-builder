import React from "react";
import { View, StyleSheet } from "react-native";
import ProductSurfaceSecondary from "../../../components/DataDisplay/ProductSurface/ProductSurfaceSecondary";
import { ActionBar } from "../../../components/Primitives/Buttons/ActionBar";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import { FoldText } from "../../../components/Primitives/FoldText";
import Divider from "../../../components/Primitives/Divider/Divider";
import { GiftCardsTile } from "../../../components/DataDisplay/GiftCardsTile";
import CategoryBoostsTile from "../../../components/DataDisplay/CategoryBoosts/CategoryBoostsTile";
import { colorMaps, spacing } from "../../../components/tokens";

// Icons
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { CalendarIcon } from "../../../components/Icons/CalendarIcon";
import CreditCardSearchIcon from "../../../components/Icons/CreditCardSearchIcon";
import SpinIcon from "../../../components/Icons/SpinIcon";
import { SwapIcon } from "../../../components/Icons/SwapIcon";
import CreditCardRefreshIcon from "../../../components/Icons/CreditCardRefreshIcon";
import SpotBuysIcon from "../../../components/Icons/SpotBuysIcon";
import DirectToBitcoinIcon from "../../../components/Icons/DirectToBitcoinIcon";

export interface CashSlotProps {
  cashAmount?: string;
  onAddCashPress?: () => void;
  onAuthorizedUsersPress?: () => void;
  onRoundUpsPress?: () => void;
  onDirectDepositPress?: () => void;
  onSeeAllTransactionsPress?: () => void;
  transactions?: Array<{
    brand?: string;
    title: string;
    subtitle: string;
    amount: string;
    date: string;
    onPress?: () => void;
  }>;
}

export default function CashSlot({
  cashAmount = "$0",
  onAddCashPress,
  onAuthorizedUsersPress,
  onRoundUpsPress,
  onDirectDepositPress,
  onSeeAllTransactionsPress,
  transactions = [
    {
      title: "Wells Fargo ••• 0684",
      subtitle: "Pending",
      amount: "$105.23",
      date: "",
    },
    {
      brand: "chewy",
      title: "Chewy gift card",
      subtitle: "Dec 7",
      amount: "$216.34",
      date: "892 sats",
    },
    {
      brand: "uber",
      title: "Uber",
      subtitle: "Dec 7",
      amount: "$216.34",
      date: "892 sats",
    },
    {
      title: "Fold+ subscription",
      subtitle: "Dec 1",
      amount: "$15",
      date: "",
    },
  ],
}: CashSlotProps) {
  return (
    <View style={styles.container}>
      {/* Cash Balance Section */}
      <ProductSurfaceSecondary
        label="Cash"
        amount={cashAmount}
        actionBar={
          <ActionBar>
            <Button label="Add cash" hierarchy="primary" size="sm" onPress={onAddCashPress} />
          </ActionBar>
        }
      />

      <Divider />

      {/* Do more with your money Section */}
      <View style={styles.section}>
        <FoldText type="header-sm" style={styles.sectionTitle}>
          Do more with your money
        </FoldText>

        <View style={styles.listContainer}>
          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<CreditCardSearchIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-stroke"
                size="lg"
              />
            }
            title="Authorized users"
            secondaryText="Share your account with family"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={onAuthorizedUsersPress}
          />

          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<CreditCardSearchIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-stroke"
                size="lg"
              />
            }
            title="Round ups"
            secondaryText="Spare change into sats"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={onRoundUpsPress}
          />

          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<CalendarIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-stroke"
                size="lg"
              />
            }
            title="Direct deposit"
            secondaryText="Get paid up to 3 days early"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={onDirectDepositPress}
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
                transaction.brand ? (
                  <IconContainer brand={transaction.brand} size="lg" />
                ) : (
                  <IconContainer
                    icon={<CreditCardSearchIcon width={20} height={20} color={colorMaps.face.primary} />}
                    variant="default-fill"
                    size="lg"
                  />
                )
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

      <Divider />

      {/* Category Boosts Section */}
      <View style={styles.categoryBoostsSection}>
        <View style={styles.categoryBoostsHeader}>
          <FoldText type="header-sm" style={styles.sectionTitle}>
            Category boosts
          </FoldText>
          <FoldText type="body-md" style={styles.sectionSubtitle}>
            Earn more sats. Stack Category Boosts with Merchant boosts for extra sats back.
          </FoldText>
        </View>

        <View style={styles.categoryBoostsGrid}>
          <View style={styles.categoryBoostsRow}>
            <CategoryBoostsTile
              variant="vertical"
              title="Restaurants & bars"
              secondaryText="1.5% sats back"
              tertiaryText="Active til Mon DD"
              leadingSlot={
                <IconContainer
                  variant="active"
                  size="lg"
                  icon={<SpinIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
            />
            <CategoryBoostsTile
              variant="vertical"
              title="Travel"
              secondaryText="1.5% sats back"
              tertiaryText="Active til Mon DD"
              leadingSlot={
                <IconContainer
                  variant="active"
                  size="lg"
                  icon={<SwapIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
            />
          </View>
          <View style={styles.categoryBoostsRow}>
            <CategoryBoostsTile
              variant="vertical"
              title="Games & media"
              secondaryText="1.5% sats back"
              tertiaryText="Active til Mon DD"
              leadingSlot={
                <IconContainer
                  variant="active"
                  size="lg"
                  icon={<CreditCardRefreshIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
            />
            <CategoryBoostsTile
              variant="vertical"
              title="Bill pay*"
              secondaryText="1.5% sats back"
              tertiaryText="Active til Mon DD"
              leadingSlot={
                <IconContainer
                  variant="active"
                  size="lg"
                  icon={<SpotBuysIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
            />
          </View>
          <CategoryBoostsTile
            variant="horizontal"
            title="All other categories"
            secondaryText="0.5% sats back"
            tertiaryText="Active til Mon DD"
            leadingSlot={
              <IconContainer
                variant="active"
                size="lg"
                icon={<DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />}
              />
            }
          />
        </View>

        <View style={styles.disclaimer}>
          <FoldText type="caption" style={styles.disclaimerText}>
            *Some Bill Pay transactions may be processed as non-Signature transactions by certain merchants. In such cases, on Spins will be earned as rewards, not sats.{" "}
            <FoldText type="caption" style={styles.disclaimerLink}>Tap here</FoldText> for more information.
          </FoldText>
        </View>
      </View>

      <Divider />

      {/* Merchant Boosts Section */}
      <View style={styles.section}>
        <View style={styles.merchantHeader}>
          <FoldText type="header-sm" style={styles.sectionTitle}>
            Merchant boosts
          </FoldText>
          <ChevronRightIcon width={24} height={24} color={colorMaps.face.primary} />
        </View>

        <View style={styles.merchantGrid}>
          <View style={styles.merchantRow}>
            <GiftCardsTile title="Chewy" secondaryText="Up to 5% sats back">
              <IconContainer brand="chewy" size="lg" />
            </GiftCardsTile>
            <GiftCardsTile title="Walgreens" secondaryText="Up to 3% sats back">
              <IconContainer brand="walgreens" size="lg" />
            </GiftCardsTile>
          </View>
          <View style={styles.merchantRow}>
            <GiftCardsTile title="Wine" secondaryText="Up to 4% sats back">
              <IconContainer brand="wine" size="lg" />
            </GiftCardsTile>
            <GiftCardsTile title="WHBM" secondaryText="Up to 6% sats back">
              <IconContainer brand="whbm" size="lg" />
            </GiftCardsTile>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  section: {
    gap: spacing["600"],
    paddingVertical: spacing["800"],
    paddingHorizontal: spacing["500"],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
  },
  sectionSubtitle: {
    color: colorMaps.face.tertiary,
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
    paddingBottom: spacing["1000"],
  },
  merchantHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  merchantGrid: {
    gap: spacing["300"],
  },
  merchantRow: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  categoryBoostsSection: {
    gap: spacing["600"],
    paddingVertical: spacing["1000"],
    paddingHorizontal: spacing["500"],
  },
  categoryBoostsHeader: {
    gap: spacing["150"],
  },
  categoryBoostsGrid: {
    gap: spacing["300"],
  },
  categoryBoostsRow: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  disclaimer: {
    paddingTop: spacing["200"],
    paddingRight: spacing["600"],
  },
  disclaimerText: {
    color: colorMaps.face.tertiary,
  },
  disclaimerLink: {
    color: colorMaps.face.primary,
    textDecorationLine: "underline",
  },
});
