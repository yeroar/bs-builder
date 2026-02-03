import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FoldText } from "../../components/Primitives/FoldText";
import MarcomHeroCard from "../../components/Marcom/MarcomHeroCard";
import ListItem from "../../components/ListItem/ListItem";
import ListItemGiftCard from "../../components/ListItem/GiftCard/ListItemGiftCard";
import { IconContainer } from "../../components/IconContainer";
import NavBTCSolidIcon from "../../components/icons/NavBTCSolidIcon";
import { ChevronRightIcon } from "../../components/icons/ChevronRightIcon";
import Divider from "../../components/Divider/Divider";
import SearchBar from "../../components/Input/SearchBar/SearchBar";
import DropDown from "../../components/DropDown/DropDown";
import { colorMaps, spacing } from "../../components/tokens";

export interface TagHomeSlotProps {
  onRedeemPress?: () => void;
  onSearchGiftCards?: () => void;
  onGiftCardPress?: (cardId: string) => void;
}

export default function TagHomeSlot({
  onRedeemPress,
  onSearchGiftCards,
  onGiftCardPress,
}: TagHomeSlotProps) {
  const [searchValue, setSearchValue] = useState("");

  // Mock gift card data - replace with real data
  const giftCards = [
    {
      id: "1",
      brand: "walgreens",
      title: "Walgreens",
      cashback: "Up to 2% sats back",
      availability: "Online and in-store",
    },
    {
      id: "2",
      brand: "wayfair",
      title: "Wayfair",
      cashback: "Up to 3.5% sats back",
      availability: "Online only",
    },
    {
      id: "3",
      brand: "whbm",
      title: "White House Black Market",
      cashback: "Up to 5% sats back",
      availability: "Online and in-store",
    },
    {
      id: "4",
      brand: "wine",
      title: "Wine.com",
      cashback: "Up to 4% sats back",
      availability: "Online only",
    },
    {
      id: "5",
      brand: "wawa",
      title: "Wawa",
      cashback: "Up to 1.5% sats back",
      availability: "In-store only",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Marcom Section */}
      <View style={styles.marcomSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.marcomScrollContent}
          decelerationRate="fast"
          snapToInterval={335 + 10}
        >
          <MarcomHeroCard
            variant="generic"
            title="Stack bitcoin back on every purchase"
            subtitle="Browse, search, and sort hundreds of gift cards on Fold."
            backgroundImage={require("../../assets/_marcomRenders.png")}
          />
          <MarcomHeroCard
            variant="generic"
            title="Earn rewards with every gift card"
            subtitle="Shop at your favorite brands and stack sats automatically."
            backgroundImage={require("../../assets/_marcomRenders.png")}
          />
          <MarcomHeroCard
            variant="generic"
            title="Turn everyday spending into bitcoin"
            subtitle="Thousands of gift cards available on the Fold platform."
            backgroundImage={require("../../assets/_marcomRenders.png")}
          />
        </ScrollView>

        <View style={styles.featureItemWrapper}>
          <ListItem
            variant="feature"
            title="Redeem Bitcoin Gift Card"
            secondaryText="Add sats to your balance"
            leadingSlot={
              <IconContainer
                variant="default-stroke"
                size="lg"
                style={{ backgroundColor: "#E56910" }}
                icon={
                  <NavBTCSolidIcon
                    width={20}
                    height={20}
                    color={colorMaps.face.inversePrimary}
                  />
                }
              />
            }
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}

            onPress={onRedeemPress}
          />
        </View>
      </View>

      <Divider />

      {/* Gift Cards Section */}
      <View style={styles.giftCardsSection}>
        <View style={styles.controls}>
          <FoldText type="header-sm" style={styles.sectionTitle}>
            Gift cards
          </FoldText>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search [category]"
            onFocus={onSearchGiftCards}
          />
          <View style={styles.segmentedControls}>
            <DropDown label="Redemption method" variant="default" onPress={() => {}} />
            <DropDown label="Categories" variant="default" onPress={() => {}} />
          </View>
        </View>

        <View style={styles.marketplace}>
          <View style={styles.list}>
            {giftCards.map((card) => (
              <ListItemGiftCard
                key={card.id}
                title={card.title}
                secondaryText={card.cashback}
                tertiaryText={card.availability}
                leadingSlot={<IconContainer brand={card.brand} />}
                trailingSlot={
                  <ChevronRightIcon
                    width={20}
                    height={20}
                    color={colorMaps.face.tertiary}
                  />
                }
                onPress={() => onGiftCardPress?.(card.id)}
              />
            ))}
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
  },
  marcomSection: {
    paddingVertical: spacing["600"],
    gap: 10,
  },
  marcomScrollContent: {
    paddingHorizontal: spacing["500"],
    gap: 10,
  },
  featureItemWrapper: {
    paddingHorizontal: spacing["500"],
  },
  giftCardsSection: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  controls: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["1000"],
    paddingBottom: 0,
    gap: spacing["400"],
  },
  segmentedControls: {
    flexDirection: "row",
    gap: spacing["200"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
    lineHeight: 24,
  },
  marketplace: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["400"],
  },
  list: {
    gap: 0,
  },
});
