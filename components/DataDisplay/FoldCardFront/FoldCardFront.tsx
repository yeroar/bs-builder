import React from "react";
import { View, StyleSheet, Pressable, type ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";
import LogoDebitIcon from "../../Icons/LogoDebitIcon";
import { EyeIcon } from "../../Icons/EyeIcon";
import { ArrowNarrowRightIcon } from "../../Icons/ArrowNarrowRightIcon";

export interface FoldCardFrontProps {
  state?: "active" | "ordered";
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export default function FoldCardFront({
  state = "active",
  onPress,
  style,
  testID,
}: FoldCardFrontProps) {
  const isOrdered = state === "ordered";

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      testID={testID}
    >
      {isOrdered && (
        <View style={styles.label}>
          <FoldText
            type="body-sm-bold"
            style={{ color: colorMaps.face.inverseTertiary }}
          >
            Your debit card is being manufactured
          </FoldText>
          <FoldText type="body-sm" style={{ color: colorMaps.face.inversePrimary }}>
            It should arrive soon.
          </FoldText>
        </View>
      )}

      <View style={styles.logo}>
        <LogoDebitIcon state={isOrdered ? "disabled" : "active"} />
      </View>

      <View style={styles.action}>
        {isOrdered ? (
          <>
            <FoldText type="body-sm" style={{ color: colorMaps.face.inversePrimary }}>
              Activate card
            </FoldText>
            <ArrowNarrowRightIcon
              color={colorMaps.face.inversePrimary}
              width={16}
              height={16}
            />
          </>
        ) : (
          <>
            <EyeIcon color={colorMaps.face.inverseSecondary} />
            <FoldText type="body-sm" style={{ color: colorMaps.face.inverseSecondary }}>
              View card details
            </FoldText>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 335 / 212,
    backgroundColor: colorMaps.object.inverse.default,
    borderWidth: 0.5,
    borderColor: colorMaps.border.primary,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  label: {
    position: "absolute",
    top: 20,
    left: 16,
    right: spacing["400"],
    gap: spacing.none,
  },
  logo: {
    position: "absolute",
    top: 67,
    right: 24,
  },
  action: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
  },
});
