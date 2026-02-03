import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../components/Primitives/FoldText";
import { IconContainer } from "../../components/Primitives/IconContainer";
import CheckCircleIcon from "../../components/Icons/CheckCircleIcon";
import { colorMaps, spacing } from "../../components/tokens";

export interface ActivationSuccessSlotProps {
  title?: string;
  message?: string;
}

export default function ActivationSuccessSlot({
  title = "Your card is active",
  message = "You can now enjoy all the features and benefits of your Fold Debit Card.",
}: ActivationSuccessSlotProps) {
  return (
    <View style={styles.container}>
      <IconContainer
        style={{ backgroundColor: colorMaps.object.positive.bold.default }}
        variant="default-fill"
        size="lg"
        icon={<CheckCircleIcon width={20} height={20} color={colorMaps.face.inversePrimary} />}
      />

      <View style={styles.copy}>
        <FoldText type="header-md" style={styles.title}>
          {title}
        </FoldText>


        <FoldText type="body-lg" style={styles.message}>
          {message}
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    gap: spacing["400"],
  },
  copy: {
    gap: spacing["300"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  message: {
    color: colorMaps.face.secondary,
  },
});
