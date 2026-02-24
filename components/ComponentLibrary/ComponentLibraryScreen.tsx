import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import FullscreenTemplate from "../../ui/Templates/FullscreenTemplate";
import PillSelector from "../Selectors/PillSelector/PillSelector";
import { FoldText } from "../Primitives/FoldText";
import Toast, { ToastType } from "../Feedback/Toast/Toast";
import MiniModal from "../Modals/MiniModal";
import Button from "../Primitives/Buttons/Button/Button";
import { BitcoinCircleIcon } from "../Icons/BitcoinCircleIcon";
import { BankIcon } from "../Icons/BankIcon";
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
import ApproachesCategory, { ApproachId } from "./categories/ApproachesCategory";
import type { AssetType } from "../../ui/Screens/flows/Cash/approaches/assetConfig";

// Approach flows
import ExpressWithdrawFlow from "../../ui/Screens/flows/Cash/approaches/ExpressWithdrawFlow";
import BottomSheetWithdrawFlow from "../../ui/Screens/flows/Cash/approaches/BottomSheetWithdrawFlow";
import ProgressiveWithdrawFlow from "../../ui/Screens/flows/Cash/approaches/ProgressiveWithdrawFlow";
import BunqStyleWithdrawFlow from "../../ui/Screens/flows/Cash/approaches/BunqStyleWithdrawFlow";
import WiseStyleWithdrawFlow from "../../ui/Screens/flows/Cash/approaches/WiseStyleWithdrawFlow";
import VenmoStyleFlow from "../../ui/Screens/flows/Cash/approaches/VenmoStyleFlow";
import ZelleStyleFlow from "../../ui/Screens/flows/Cash/approaches/ZelleStyleFlow";
import CashAppStyleFlow from "../../ui/Screens/flows/Cash/approaches/CashAppStyleFlow";
import StrikeStyleFlow from "../../ui/Screens/flows/Cash/approaches/StrikeStyleFlow";
import RemittanceStyleFlow from "../../ui/Screens/flows/Cash/approaches/RemittanceStyleFlow";
import MPesaStyleFlow from "../../ui/Screens/flows/Cash/approaches/MPesaStyleFlow";
import ApproachSectionTest from "../../ui/Screens/flows/Cash/approaches/ApproachSectionTest";
import DeFiVaultStyleFlow from "../../ui/Screens/flows/Cash/approaches/DeFiVaultStyleFlow";
import GuardedSendStyleFlow from "../../ui/Screens/flows/Cash/approaches/GuardedSendStyleFlow";
import QuickConvertStyleFlow from "../../ui/Screens/flows/Cash/approaches/QuickConvertStyleFlow";
import GiftCardPurchaseFlow from "../../ui/Screens/flows/Cash/approaches/GiftCardPurchaseFlow";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "approaches", label: "Approaches" },
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
  const [activeApproach, setActiveApproach] = useState<ApproachId | null>(null);
  const [pendingApproach, setPendingApproach] = useState<ApproachId | null>(null);
  const [assetType, setAssetType] = useState<AssetType>("cash");
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

  const handleLaunchApproach = useCallback((id: ApproachId) => {
    setPendingApproach(id);
  }, []);

  const handleAssetSelect = useCallback((type: AssetType) => {
    setAssetType(type);
    setActiveApproach(pendingApproach);
    setPendingApproach(null);
  }, [pendingApproach]);

  const handleCloseAssetSelector = useCallback(() => {
    setPendingApproach(null);
  }, []);

  const handleCloseApproach = useCallback(() => {
    setActiveApproach(null);
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
      case "approaches":
        return <ApproachesCategory onLaunch={handleLaunchApproach} />;
      case "all":
      default:
        return (
          <>
            <View style={styles.categorySection}>
              <FoldText type="header-sm" style={styles.sectionTitle}>Approaches</FoldText>
              <ApproachesCategory onLaunch={handleLaunchApproach} />
            </View>
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

  // Render the active approach flow as a fullscreen overlay
  const renderApproachOverlay = () => {
    switch (activeApproach) {
      case "express":
        return <ExpressWithdrawFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "bottomSheet":
        return <BottomSheetWithdrawFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "progressive":
        return <ProgressiveWithdrawFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "bunq":
        return <BunqStyleWithdrawFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "wise":
        return <WiseStyleWithdrawFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "venmo":
        return <VenmoStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "zelle":
        return <ZelleStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "cashApp":
        return <CashAppStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "strike":
        return <StrikeStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "remittance":
        return <RemittanceStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "mpesa":
        return <MPesaStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "sectionTest":
        return <ApproachSectionTest assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "defiVault":
        return <DeFiVaultStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "guardedSend":
        return <GuardedSendStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "quickConvert":
        return <QuickConvertStyleFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      case "giftCard":
        return <GiftCardPurchaseFlow assetType={assetType} onComplete={handleCloseApproach} onClose={handleCloseApproach} />;
      default:
        return null;
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

      {/* Asset type selector — shown before launching approach */}
      <Modal
        visible={pendingApproach !== null}
        transparent
        animationType="none"
        onRequestClose={handleCloseAssetSelector}
      >
        <MiniModal
          variant="default"
          onClose={handleCloseAssetSelector}
          showHeader={false}
        >
          <View style={styles.assetSelectorContent}>
            <FoldText type="header-sm" style={styles.assetSelectorTitle}>
              Test with which asset?
            </FoldText>
            <View style={styles.assetSelectorButtons}>
              <Button
                label="Cash (USD)"
                hierarchy="secondary"
                size="md"
                leadingSlot={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
                onPress={() => handleAssetSelect("cash")}
              />
              <Button
                label="Bitcoin (BTC)"
                hierarchy="secondary"
                size="md"
                leadingSlot={<BitcoinCircleIcon width={20} height={20} color={colorMaps.face.primary} />}
                onPress={() => handleAssetSelect("bitcoin")}
              />
            </View>
          </View>
        </MiniModal>
      </Modal>

      {/* Approach flow overlay — renders ABOVE everything */}
      {activeApproach && (
        <View style={styles.approachOverlay}>
          {renderApproachOverlay()}
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
  approachOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 500,
    backgroundColor: colorMaps.layer.background,
  },
  assetSelectorContent: {
    gap: spacing["400"],
    alignItems: "center",
  },
  assetSelectorTitle: {
    color: colorMaps.face.primary,
  },
  assetSelectorButtons: {
    width: "100%",
    gap: spacing["300"],
  },
});
