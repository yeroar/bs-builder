import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import { colorMaps, spacing } from "../tokens";

export interface ProductSurfaceRewardsProps {
  amount?: string;
  children?: ReactNode;
  action?: ReactNode | boolean;
  onRewardsPress?: () => void;
  style?: ViewStyle;
}

export default function ProductSurfaceRewards({
  amount = "$0.00",
  children,
  action,
  onRewardsPress,
  style,
}: ProductSurfaceRewardsProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.performance}>
        <View style={styles.balance}>
          {/* Header */}
          <Pressable
            style={styles.header}
            onPress={onRewardsPress}
            disabled={!onRewardsPress}
          >
            <FoldText type="header-md" style={styles.titleText}>
              Rewards
            </FoldText>
            <ChevronRightIcon
              width={24}
              height={24}
              color={colorMaps.face.primary}
            />
          </Pressable>

          {/* Amount */}
          <FoldText type="header-md" style={styles.amountText}>
            {amount}
          </FoldText>
        </View>

        {/* Progress Visualization / Data Viz */}
        {children}
      </View>

      {/* Action */}
      {action && typeof action !== 'boolean' && (
        <View style={styles.buttonContainer}>
          {action}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["800"],
    width: "100%",
  },
  performance: {
    gap: spacing["300"],
  },
  balance: {
    gap: spacing["100"],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  titleText: {
    color: colorMaps.face.primary,
  },
  amountText: {
    color: colorMaps.face.primary,
  },
  buttonContainer: {
    marginTop: spacing["500"],
    width: "100%",
  },
});
