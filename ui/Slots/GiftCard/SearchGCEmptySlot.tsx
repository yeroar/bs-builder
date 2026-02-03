import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../components/Inputs/SearchBar/SearchBar";
import DropDown from "../../../components/Selectors/DropDown/DropDown";
import Divider from "../../../components/Primitives/Divider/Divider";
import { SearchHeader } from "../../../components/DataDisplay/Headers";
import SearchPill from "../../../components/Selectors/SearchPill/SearchPill";
import { ListItemGiftCard } from "../../../components/DataDisplay/ListItem";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";
import GCRedemptionMethodModal from "../../../components/modals/GCRedemptionMethodModal";
import GCCategoriesModal from "../../../components/modals/GCCategoriesModal";
import GCDetailModal from "../../../components/modals/GCDetailModal";
import GiftCardConfirmationScreen from "../../Screens/GiftCardConfirmationScreen";
import { RedemptionMethod } from "./GCRedemptionMethodSlot";
import { GCCategory } from "./GCCategoriesSlot";

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

export interface SearchGCEmptySlotProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchBack?: () => void;
  onRedemptionMethodPress?: () => void;
  onCategoriesPress?: () => void;
  recentSearches?: RecentSearch[];
  onClearRecentSearches?: () => void;
  onRecentSearchPress?: (search: RecentSearch) => void;
  recommendedCards?: RecommendedCard[];
  onRecommendedCardPress?: (card: RecommendedCard) => void;
}

const DEFAULT_RECENT_SEARCHES: RecentSearch[] = [
  { label: "Chewy", brand: "Chewy", chipLabel: "Up to 5%" },
  { label: "Uber", brand: "Chewy", chipLabel: "Up to 3%" },
];

const DEFAULT_RECOMMENDED_CARDS: RecommendedCard[] = [
  { title: "Amazon", cashback: "Up to 1.75% sats back", availability: "Online and in-store", brand: "Chewy" },
  { title: "Walmart", cashback: "Up to 2.5% sats back", availability: "Online and in-store", brand: "Walmart" },
  { title: "Walgreens", cashback: "Up to 3% sats back", availability: "Online and in-store", brand: "walgreens" },
  { title: "Wayfair", cashback: "Up to 4% sats back", availability: "Online", brand: "wayfair" },
  { title: "Wawa", cashback: "Up to 2% sats back", availability: "In-store", brand: "wawa" },
];

export default function SearchGCEmptySlot({
  searchValue,
  onSearchChange,
  onSearchBack,
  onRedemptionMethodPress,
  onCategoriesPress,
  recentSearches = DEFAULT_RECENT_SEARCHES,
  onClearRecentSearches,
  onRecentSearchPress,
  recommendedCards = DEFAULT_RECOMMENDED_CARDS,
  onRecommendedCardPress,
}: SearchGCEmptySlotProps) {
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [selectedRedemptionMethod, setSelectedRedemptionMethod] = useState<RedemptionMethod | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<GCCategory[]>([]);
  const [selectedCard, setSelectedCard] = useState<RecommendedCard | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleCardPress = (card: RecommendedCard) => {
    Keyboard.dismiss();
    if (onRecommendedCardPress) {
      onRecommendedCardPress(card);
    } else {
      setSelectedCard(card);
      setTimeout(() => setShowDetailModal(true), 100);
    }
  };

  const handleRedemptionMethodPress = () => {
    Keyboard.dismiss();
    if (onRedemptionMethodPress) {
      onRedemptionMethodPress();
    } else {
      // Small delay to allow keyboard to dismiss and searchbar to update
      setTimeout(() => setShowRedemptionModal(true), 100);
    }
  };

  const handleCategoriesPress = () => {
    Keyboard.dismiss();
    if (onCategoriesPress) {
      onCategoriesPress();
    } else {
      // Small delay to allow keyboard to dismiss and searchbar to update
      setTimeout(() => setShowCategoriesModal(true), 100);
    }
  };

  const getRedemptionLabel = () => {
    if (!selectedRedemptionMethod) return "Redemption method";
    switch (selectedRedemptionMethod) {
      case "in-store": return "In-store";
      case "online": return "Online";
      case "both": return "In-store and online";
    }
  };

  const getCategoriesLabel = () => {
    if (selectedCategories.length === 0) return "Categories";
    if (selectedCategories.length === 1) return "1 category";
    return `${selectedCategories.length} categories`;
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Controls Section */}
        <View style={styles.controls}>
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onBack={onSearchBack}
            placeholder="Search brands"
            focus
            forceFilledState
          />
          <View style={styles.filters}>
            <DropDown
              label={getRedemptionLabel()}
              variant={selectedRedemptionMethod ? "active" : "default"}
              onPress={handleRedemptionMethodPress}
            />
            <DropDown
              label={getCategoriesLabel()}
              variant={selectedCategories.length > 0 ? "active" : "default"}
              onPress={handleCategoriesPress}
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
          {/* Recent Searches Section */}
          {recentSearches.length > 0 && (
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
                    onPress={() => onRecentSearchPress?.(search)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Recommended Section */}
          <View style={styles.section}>
            <SearchHeader
              title="Recommended"
              actionLabel="See all"
              onActionPress={() => { }}
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
                  onPress={() => handleCardPress(card)}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Filter Modals */}
        <GCRedemptionMethodModal
          visible={showRedemptionModal}
          initialMethod={selectedRedemptionMethod}
          onClose={() => setShowRedemptionModal(false)}
          onApply={(method) => setSelectedRedemptionMethod(method)}
        />

        <GCCategoriesModal
          visible={showCategoriesModal}
          initialCategories={selectedCategories}
          onClose={() => setShowCategoriesModal(false)}
          onApply={(categories) => setSelectedCategories(categories)}
        />

        {selectedCard && (
          <GCDetailModal
            visible={showDetailModal}
            brand={selectedCard.brand}
            title={`${selectedCard.title} gift card`}
            satsBack={selectedCard.cashback}
            availability={selectedCard.availability}
            onClose={() => setShowDetailModal(false)}
            onContinue={(amount) => {
              setSelectedAmount(amount);
              setShowDetailModal(false);
              setTimeout(() => setShowConfirmationScreen(true), 100);
            }}
            onFavorite={() => {
              console.log(`Favorite ${selectedCard.title}`);
            }}
          />
        )}
      </SafeAreaView>

      {/* Confirmation Screen - slides up from bottom */}
      {showConfirmationScreen && selectedCard && selectedAmount && (
        <GiftCardConfirmationScreen
          brand={selectedCard.brand}
          brandLabel={selectedCard.title}
          amount={`$${selectedAmount}`}
          purchaseAmount={`$${(selectedAmount * 0.99).toFixed(2)}`}
          feeAmount={`+$${(selectedAmount * 0.01).toFixed(2)}`}
          onClose={() => setShowConfirmationScreen(false)}
          onFavorite={() => {
            console.log(`Favorite ${selectedCard.title}`);
          }}
          onSendAsGift={() => {
            console.log(`Send ${selectedCard.title} as gift`);
          }}
          onDone={() => {
            // Close confirmation and go back to TagHomeScreen
            setShowConfirmationScreen(false);
            onSearchBack?.();
          }}
          onRedeem={() => {
            console.log(`Redeem ${selectedCard.title} gift card`);
          }}
          onViewDetails={() => {
            console.log(`View details for ${selectedCard.title}`);
          }}
        />
      )}
    </>
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
