import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../tokens";

export interface ProductSurfaceBillPayProps {
  month?: string;
  amount?: string;
  chip?: ReactNode;
  progressViz?: ReactNode;
  children?: ReactNode;
  onMonthPress?: () => void;
  style?: ViewStyle;
}

export default function ProductSurfaceBillPay({
  month = "August",
  amount = "$1,750",
  chip,
  progressViz,
  children,
  onMonthPress,
  style,
}: ProductSurfaceBillPayProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {/* Title block */}
        <View style={styles.titleBlock}>
          {/* Label row */}
          <View style={styles.labelRow}>
            <Pressable
              style={styles.monthRow}
              onPress={onMonthPress}
              disabled={!onMonthPress}
            >
              <FoldText type="header-md" style={styles.monthText}>
                {month}
              </FoldText>
              <ChevronRightIcon
                width={24}
                height={24}
                color={colorMaps.face.primary}
              />
            </Pressable>
            {chip}
          </View>

          {/* Amount */}
          <FoldText type="header-md" style={styles.amountText}>
            {amount}
          </FoldText>
        </View>

        {/* Progress visualization */}
        {children || progressViz}
      </View>
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
  content: {
    gap: spacing["300"],
  },
  titleBlock: {
    gap: spacing["100"],
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  monthText: {
    color: colorMaps.face.primary,
  },
  amountText: {
    color: colorMaps.face.primary,
  },
});
