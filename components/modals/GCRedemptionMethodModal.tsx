import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MiniModal from "./MiniModal";
import ModalFooter from "./ModalFooter";
import Button from "../Buttons/Button/Button";
import { FoldText } from "../Primitives/FoldText";
import GCRedemptionMethodSlot, {
  RedemptionMethod,
} from "../../ui/Slots/GiftCard/GCRedemptionMethodSlot";
import { spacing, colorMaps } from "../tokens";

export interface GCRedemptionMethodModalProps {
  visible?: boolean;
  initialMethod?: RedemptionMethod | null;
  onClose?: () => void;
  onApply?: (method: RedemptionMethod | null) => void;
}

export default function GCRedemptionMethodModal({
  visible = true,
  initialMethod = null,
  onClose,
  onApply,
}: GCRedemptionMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<RedemptionMethod | null>(
    initialMethod
  );

  const handleClear = () => {
    setSelectedMethod(null);
  };

  const handleApply = () => {
    onApply?.(selectedMethod);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <MiniModal
      onClose={onClose}
      header={
        <View style={styles.header}>
          <FoldText type="header-xxs" style={styles.headerTitle}>
            Filter by redemption method
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
        <GCRedemptionMethodSlot
          selectedMethod={selectedMethod}
          onMethodSelect={setSelectedMethod}
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
