import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../../../components/Inputs/SearchBar/SearchBar";
import DropDown from "../../../components/Selectors/DropDown/DropDown";
import Divider from "../../../components/Primitives/Divider/Divider";
import { SearchHeader } from "../../../components/DataDisplay/Headers";
import SearchPill from "../../../components/Selectors/SearchPill/SearchPill";
import { ListItemGiftCard } from "../../../components/DataDisplay/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface RecentSearch {
  label: string;
  brand: string;
  chipLabel?: string;
}

export interface RecommendedCard {
  title: string;
  cashback: string;
  availability: string;
  brand: string;
}

export interface GiftCardSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onBack?: () => void;
  redemptionMethodLabel: string;
  redemptionMethodActive: boolean;
  onRedemptionMethodPress: () => void;
  categoriesLabel: string;
  categoriesActive: boolean;
  onCategoriesPress: () => void;
  recentSearches: RecentSearch[];
  onClearRecentSearches: () => void;
  onRecentSearchPress: (search: RecentSearch) => void;
  recommendedCards: RecommendedCard[];
  onCardPress: (card: RecommendedCard) => void;
}

export default function GiftCardSearch({
  searchValue,
  onSearchChange,
  onBack,
  redemptionMethodLabel,
  redemptionMethodActive,
  onRedemptionMethodPress,
  categoriesLabel,
  categoriesActive,
  onCategoriesPress,
  recentSearches,
  onClearRecentSearches,
  onRecentSearchPress,
  recommendedCards,
  onCardPress,
}: GiftCardSearchProps) {
  return (
    <View style={styles.container}>
      {/* Controls */}
      <View style={styles.controls}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onBack={onBack}
          placeholder="Search brands"
          focus
          forceFilledState
        />
        <View style={styles.filters}>
          <DropDown
            label={redemptionMethodLabel}
            variant={redemptionMethodActive ? "active" : "default"}
            onPress={onRedemptionMethodPress}
          />
          <DropDown
            label={categoriesLabel}
            variant={categoriesActive ? "active" : "default"}
            onPress={onCategoriesPress}
          />
        </View>
      </View>

      <Divider />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Recent Searches */}
        <View style={styles.section}>
          <SearchHeader
            title="Recent searches"
            actionLabel="Clear all"
            onActionPress={onClearRecentSearches}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsContainer}
          >
            {recentSearches.map((search, index) => (
              <SearchPill
                key={index}
                label={search.label}
                brand={search.brand}
                hasAvatar
                onPress={() => onRecentSearchPress(search)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <SearchHeader
            title="Recommended"
            actionLabel="See all"
            onActionPress={() => console.log("See all")}
          />
          <View style={styles.list}>
            {recommendedCards.map((card, index) => (
              <ListItemGiftCard
                key={index}
                title={card.title}
                secondaryText={card.cashback}
                tertiaryText={card.availability}
                leadingSlot={<IconContainer brand={card.brand} />}
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
                onPress={() => onCardPress(card)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  controls: {
    gap: spacing["400"],
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["400"],
  },
  filters: {
    flexDirection: "row",
    gap: spacing["200"],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing["600"],
  },
  section: {
    gap: spacing["500"],
    paddingTop: spacing["500"],
  },
  pillsContainer: {
    paddingHorizontal: spacing["500"],
    gap: spacing["200"],
  },
  list: {
    paddingHorizontal: spacing["500"],
  },
});
