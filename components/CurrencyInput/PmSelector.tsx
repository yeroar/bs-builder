import React from "react";
import { Pressable, View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import { PlusCircleIcon } from "../Icons/PlusCircleIcon";
import { BankIcon } from "../Icons/BankIcon";
import { IconContainer } from "../Primitives/IconContainer";
import { colorMaps, spacing, radius } from "../tokens";

export type PmSelectorVariant = "null" | "bankAccount" | "cardAccount" | "foldAccount" | "bitcoinAccount";

export interface PmSelectorProps {
  variant?: PmSelectorVariant;
  label?: string;
  /** Brand for bankAccount or cardAccount variant (chase, amex, visa, etc.) */
  brand?: string;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function PmSelector({
  variant = "null",
  label,
  brand,
  onPress,
  style,
  testID,
}: PmSelectorProps) {
  const isNull = variant === "null";

  const getIcon = () => {
    switch (variant) {
      case "bankAccount":
        if (brand) {
          return <IconContainer brand={brand} size="xs" style={styles.brandIcon} />;
        }
        return <BankIcon width={16} height={16} color={colorMaps.face.primary} />;
      case "cardAccount":
        return <IconContainer brand={brand || "credit"} size="xs" style={styles.brandIcon} />;
      case "foldAccount":
        return <IconContainer brand="cash" size="xs" style={styles.brandIcon} />;
      case "bitcoinAccount":
        return <IconContainer brand="bitcoin" size="xs" style={styles.brandIcon} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    if (label) return label;
    switch (variant) {
      case "null":
        return "Add payment method";
      case "bankAccount":
        return "bankAccount 1234";
      case "cardAccount":
        return "cardAccount 1234";
      case "foldAccount":
        return "Cash balance";
      case "bitcoinAccount":
        return "Bitcoin balance";
      default:
        return "Add payment method";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isNull
          ? pressed
            ? styles.containerNullPressed
            : styles.containerNull
          : pressed
            ? styles.containerAccountPressed
            : styles.containerAccount,
        style,
      ]}
      testID={testID}
    >
      {({ pressed }) => (
        <View style={styles.balance}>
          {getIcon()}
          <View style={styles.labelRow}>
            <FoldText
              type="body-sm-bold"
              style={[
                styles.text,
                isNull
                  ? pressed
                    ? styles.textNullPressed
                    : styles.textNull
                  : styles.textAccount,
              ]}
            >
              {isNull && pressed ? "Select payment method" : getLabel()}
            </FoldText>
            {!isNull && (
              <ChevronDownIcon
                width={16}
                height={16}
                color={colorMaps.face.primary}
              />
            )}
          </View>
          {isNull && (
            <PlusCircleIcon
              width={16}
              height={16}
              color={pressed ? colorMaps.face.accentSubtle : colorMaps.face.accentBold}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["300"],
    paddingVertical: spacing["200"],
    borderRadius: radius.xl,
    shadowColor: "#C2C2C2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 2,
  },
  containerNull: {
    backgroundColor: colorMaps.object.accent.subtle.default,
  },
  containerNullPressed: {
    backgroundColor: colorMaps.object.accent.bold.pressed,
  },
  containerAccount: {
    backgroundColor: colorMaps.object.secondary.default,
  },
  containerAccountPressed: {
    backgroundColor: colorMaps.object.secondary.pressed,
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["50"],
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  },
  textNull: {
    color: colorMaps.face.accentBold,
  },
  textNullPressed: {
    color: colorMaps.face.accentSubtle,
  },
  textAccount: {
    color: colorMaps.face.primary,
  },
  brandIcon: {
    width: 20,
    height: 20,
  },
});
