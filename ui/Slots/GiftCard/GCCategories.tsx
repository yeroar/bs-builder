import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Checklist from "../../../components/Selectors/Checklist/Checklist";
import { colorMaps, spacing } from "../../../components/tokens";

export type GCCategory =
  | "top-brands"
  | "boosted"
  | "favorites"
  | "gas-fuel"
  | "groceries"
  | "auto"
  | "bitcoin"
  | "beauty"
  | "clothing"
  | "dining"
  | "electronics"
  | "entertainment"
  | "food-delivery";

export interface GCCategoriesProps {
  selectedCategories?: GCCategory[];
  onCategoryToggle?: (category: GCCategory) => void;
  maxHeight?: number;
}

const CATEGORY_OPTIONS: { value: GCCategory; label: string }[] = [
  { value: "top-brands", label: "Top brands" },
  { value: "boosted", label: "Boosted" },
  { value: "favorites", label: "Favorites" },
  { value: "gas-fuel", label: "Gas / Fuel" },
  { value: "groceries", label: "Groceries" },
  { value: "auto", label: "Auto" },
  { value: "bitcoin", label: "Bitcoin" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "clothing", label: "Clothing" },
  { value: "dining", label: "Dining" },
  { value: "electronics", label: "Electronics and Gaming" },
  { value: "entertainment", label: "Entertainment" },
  { value: "food-delivery", label: "Food Delivery" },
];

export default function GCCategories({
  selectedCategories = [],
  onCategoryToggle,
  maxHeight = 400,
}: GCCategoriesProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.scrollView, { maxHeight }]}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORY_OPTIONS.map((option) => (
          <Checklist
            key={option.value}
            label={option.label}
            isSelected={selectedCategories.includes(option.value)}
            hasDiv={false}
            onPress={() => onCategoryToggle?.(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    gap: 0,
  },
});
