import React, { useState } from "react";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GiftCardSearch, { RecommendedCard } from "../../../Slots/GiftCard/GiftCardSearch";
import GCRedemptionMethodModal from "../../../../components/Modals/GCRedemptionMethodModal";
import GCCategoriesModal from "../../../../components/Modals/GCCategoriesModal";
import { RedemptionMethod } from "../../../Slots/GiftCard/GCRedemptionMethod";
import { GCCategory } from "../../../Slots/GiftCard/GCCategories";
import { SelectedCard } from "./GiftCardPurchaseFlow";
import { buildSelectedCard } from "./buildSelectedCard";

const DEFAULT_RECENT_SEARCHES = [
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

export interface GiftCardSearchScreenProps {
  onBack: () => void;
  onCardPress: (card: SelectedCard) => void;
}

export default function GiftCardSearchScreen({ onBack, onCardPress }: GiftCardSearchScreenProps) {
  const [searchValue, setSearchValue] = useState("");
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedRedemptionMethod, setSelectedRedemptionMethod] = useState<RedemptionMethod | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<GCCategory[]>([]);

  const handleCardPress = (card: RecommendedCard) => {
    Keyboard.dismiss();
    onCardPress(buildSelectedCard(card));
  };

  const handleRedemptionMethodPress = () => {
    Keyboard.dismiss();
    setTimeout(() => setShowRedemptionModal(true), 100);
  };

  const handleCategoriesPress = () => {
    Keyboard.dismiss();
    setTimeout(() => setShowCategoriesModal(true), 100);
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
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <GiftCardSearch
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onBack={onBack}
        redemptionMethodLabel={getRedemptionLabel()}
        redemptionMethodActive={!!selectedRedemptionMethod}
        onRedemptionMethodPress={handleRedemptionMethodPress}
        categoriesLabel={getCategoriesLabel()}
        categoriesActive={selectedCategories.length > 0}
        onCategoriesPress={handleCategoriesPress}
        recentSearches={DEFAULT_RECENT_SEARCHES}
        onClearRecentSearches={() => console.log("Clear recent searches")}
        onRecentSearchPress={(search) => console.log("Recent search:", search.label)}
        recommendedCards={DEFAULT_RECOMMENDED_CARDS}
        onCardPress={handleCardPress}
      />

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
    </SafeAreaView>
  );
}
