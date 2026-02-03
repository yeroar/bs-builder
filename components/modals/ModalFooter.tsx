import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing } from "../tokens";

export type FooterType = "default" | "dualButton" | "clean" | "inverse";

export interface ModalFooterProps {
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  disclaimer?: React.ReactNode;
  type?: FooterType;
  /** @deprecated Use `type` instead */
  variant?: "stacked" | "sideBySide";
  modalVariant?: "default" | "keyboard";
  style?: ViewStyle;
  testID?: string;
}

export default function ModalFooter({
  primaryButton,
  secondaryButton,
  disclaimer,
  type,
  variant,
  modalVariant = "default",
  style,
  testID,
}: ModalFooterProps) {
  // Support legacy variant prop, map to new type
  const resolvedType: FooterType = type ?? (variant === "sideBySide" ? "dualButton" : "default");

  const isDualButton = resolvedType === "dualButton";
  const isClean = resolvedType === "clean";
  const isInverse = resolvedType === "inverse";
  const paddingBottom = modalVariant === "keyboard" ? spacing["400"] : spacing["1400"];

  // Clean variant - just paddingBottom spacing, no content
  if (isClean) {
    return (
      <View style={[styles.containerClean, style]} testID={testID} />
    );
  }

  return (
    <View
      style={[
        styles.container,
        isInverse && styles.containerInverse,
        { paddingBottom },
        style
      ]}
      testID={testID}
    >
      {/* Disclaimer Section */}
      {disclaimer && (
        <View style={styles.disclaimerContainer}>
          {typeof disclaimer === "string" ? (
            <FoldText type="body-sm" style={styles.disclaimerText}>
              {disclaimer}
            </FoldText>
          ) : (
            disclaimer
          )}
        </View>
      )}

      {/* Buttons Section */}
      <View style={[
        styles.buttonContainer,
        isDualButton ? styles.buttonContainerRow : styles.buttonContainerColumn
      ]}>
        {isDualButton ? (
          <>
            {primaryButton && <View style={styles.flexOne}>{primaryButton}</View>}
            {secondaryButton && <View style={styles.flexOne}>{secondaryButton}</View>}
          </>
        ) : (
          <>
            {primaryButton}
            {secondaryButton}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    paddingTop: spacing["100"],
    paddingHorizontal: spacing["500"],
    gap: spacing["200"],
    width: "100%",
  },
  containerInverse: {
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  containerClean: {
    backgroundColor: colorMaps.layer.background,
    paddingBottom: spacing["1600"],
    width: "100%",
  },
  disclaimerContainer: {
    paddingBottom: spacing["200"],
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimerText: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
    lineHeight: 16,
  },
  buttonContainer: {
    width: "100%",
    gap: spacing["200"],
  },
  buttonContainerColumn: {
    flexDirection: "column",
  },
  buttonContainerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  flexOne: {
    flex: 1,
  },
});
