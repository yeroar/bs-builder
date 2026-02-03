import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FullscreenTemplate from "../../ui/Templates/FullscreenTemplate";
import PillSelector from "../Selectors/PillSelector/PillSelector";
import { FoldText } from "../Primitives/FoldText";
import Toast, { ToastType } from "../Feedback/Toast/Toast";
import { colorMaps, spacing } from "../tokens";

// Category components
import FoundationCategory from "./categories/FoundationCategory";
import FormsCategory from "./categories/FormsCategory";
import SelectionCategory from "./categories/SelectionCategory";
import ListsCategory from "./categories/ListsCategory";
import NavigationCategory from "./categories/NavigationCategory";
import DataDisplayCategory from "./categories/DataDisplayCategory";
import FeedbackCategory from "./categories/FeedbackCategory";
import ModalsCategory from "./categories/ModalsCategory";
import HeadersCategory from "./categories/HeadersCategory";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "foundation", label: "Foundation" },
  { id: "forms", label: "Forms" },
  { id: "selection", label: "Selection" },
  { id: "lists", label: "Lists" },
  { id: "headers", label: "Headers" },
  { id: "navigation", label: "Navigation" },
  { id: "dataDisplay", label: "Data Display" },
  { id: "feedback", label: "Feedback" },
  { id: "modals", label: "Modals" },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

interface ComponentLibraryScreenProps {
  onBack: () => void;
}

export default function ComponentLibraryScreen({ onBack }: ComponentLibraryScreenProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState<{
    message: string;
    type: ToastType;
  }>({ message: "Info message...", type: "info" });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToastConfig({ message, type });
    setToastVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "foundation":
        return <FoundationCategory />;
      case "forms":
        return <FormsCategory />;
      case "selection":
        return <SelectionCategory />;
      case "lists":
        return <ListsCategory />;
      case "headers":
        return <HeadersCategory />;
      case "navigation":
        return <NavigationCategory />;
      case "dataDisplay":
        return <DataDisplayCategory />;
      case "feedback":
        return <FeedbackCategory onShowToast={showToast} />;
      case "modals":
        return <ModalsCategory />;
      case "all":
      default:
        return (
          <>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Foundation</FoldText>
              <FoundationCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Forms</FoldText>
              <FormsCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Selection</FoldText>
              <SelectionCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Lists</FoldText>
              <ListsCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Headers</FoldText>
              <HeadersCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Navigation</FoldText>
              <NavigationCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Data Display</FoldText>
              <DataDisplayCategory />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Feedback</FoldText>
              <FeedbackCategory onShowToast={showToast} />
            </View>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Modals</FoldText>
              <ModalsCategory />
            </View>
          </>
        );
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <FullscreenTemplate
        title="Component Library"
        leftIcon="x"
        onLeftPress={onBack}
        scrollable={false}
      >
        <View style={styles.container}>
        {/* Category tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContent}
          >
            {CATEGORIES.map((category) => (
              <PillSelector
                key={category.id}
                label={category.label}
                isActive={activeCategory === category.id}
                onPress={() => setActiveCategory(category.id)}
                size="sm"
              />
            ))}
          </ScrollView>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCategoryContent()}
        </ScrollView>
      </View>
      </FullscreenTemplate>

      {/* Toast overlay */}
      {toastVisible && (
        <View style={styles.toastOverlay}>
          <Toast
            message={toastConfig.message}
            type={toastConfig.type}
            showIcon
            dismissable
            autoDismiss
            autoDismissDelay={3000}
            onDismiss={hideToast}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  toastOverlay: {
    position: "absolute",
    top: 56, // Below the safe area / header
    left: spacing["500"],
    right: spacing["500"],
    zIndex: 1000,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colorMaps.border.tertiary,
    backgroundColor: colorMaps.layer.background,
  },
  tabsContent: {
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["300"],
    gap: spacing["200"],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing["400"],
    paddingBottom: spacing["800"],
  },
  categorySection: {
    marginBottom: spacing["600"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
    marginBottom: spacing["400"],
  },
});
