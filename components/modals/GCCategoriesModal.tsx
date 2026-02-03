import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MiniModal from "./MiniModal";
import ModalFooter from "./ModalFooter";
import Button from "../Buttons/Button/Button";
import { FoldText } from "../Primitives/FoldText";
import GCCategoriesSlot, { GCCategory } from "../Slots/GiftCard/GCCategoriesSlot";
import { spacing, colorMaps } from "../tokens";

export interface GCCategoriesModalProps {
  visible?: boolean;
  initialCategories?: GCCategory[];
  onClose?: () => void;
  onApply?: (categories: GCCategory[]) => void;
}

export default function GCCategoriesModal({
  visible = true,
  initialCategories = [],
  onClose,
  onApply,
}: GCCategoriesModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<GCCategory[]>(
    initialCategories
  );

  const handleCategoryToggle = (category: GCCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClear = () => {
    setSelectedCategories([]);
  };

  const handleApply = () => {
    onApply?.(selectedCategories);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <MiniModal
      onClose={onClose}
      header={
        <View style={styles.header}>
          <FoldText type="header-xxs" style={styles.headerTitle}>
            Filter by categories
          </FoldText>
        </View>
      }
      footer={
        <ModalFooter
          type="dualButton"
          primaryButton={
            <Button
              label="Clear"
              hierarchy="secondary"
              size="md"
              onPress={handleClear}
            />
          }
          secondaryButton={
            <Button
              label="Apply"
              hierarchy="primary"
              size="md"
              onPress={handleApply}
            />
          }
        />
      }
    >
      <View style={styles.content}>
        <GCCategoriesSlot
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          maxHeight={400}
        />
      </View>
    </MiniModal>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing["400"],
  },
  headerTitle: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
  content: {
    marginHorizontal: -spacing["500"],
  },
});
