import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../tokens";

export interface ProductSurfaceSecondaryProps {
  label?: string;
  amount?: string;
  dataViz?: ReactNode;
  actionBar?: ReactNode;
  hasTitleIcon?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function ProductSurfaceSecondary({
  label = "Rewards",
  amount = "$0.00",
  dataViz,
  actionBar,
  hasTitleIcon = false,
  onPress,
  style,
}: ProductSurfaceSecondaryProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.performance}>
        <View style={styles.balance}>
          {/* Header */}
          <Pressable
            style={styles.header}
            onPress={onPress}
            disabled={!onPress}
          >
            <FoldText type="header-md" style={styles.titleText}>
              {label}
            </FoldText>
            {hasTitleIcon && (
              <ChevronRightIcon
                width={24}
                height={24}
                color={colorMaps.face.primary}
              />
            )}
          </Pressable>

          {/* Amount */}
          <FoldText type="header-md" style={styles.amountText}>
            {amount}
          </FoldText>
        </View>

        {/* Data Viz / Progress Visualization */}
        {dataViz}
      </View>

      {/* Action Bar */}
      {actionBar && (
        <View style={styles.actionBarContainer}>
          {actionBar}
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
    gap: spacing["500"],
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
  actionBarContainer: {
    width: "100%",
  },
});
