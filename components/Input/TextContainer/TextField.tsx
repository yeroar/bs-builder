import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import TextContainer, { TextContainerProps } from "./TextContainer";
import Footnote, { FootnoteType } from "../footnote/Footnote";
import { colorMaps, spacing } from "../../tokens";

export interface TextFieldProps extends TextContainerProps {
  label?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  footerType?: FootnoteType;
  containerStyle?: ViewStyle;
}

export default function TextField({
  label,
  footer,
  footerType = "info",
  containerStyle,
  error,
  state,
  ...textContainerProps
}: TextFieldProps) {
  const isError = error || state === "error";
  const effectiveFooterType = isError ? "error" : footerType;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        typeof label === "string" ? (
          <FoldText type="body-md-bold" style={styles.label}>
            {label}
          </FoldText>
        ) : (
          label
        )
      )}

      <TextContainer error={error} state={state} {...textContainerProps} />

      {footer && (
        typeof footer === "string" ? (
          <Footnote
            message={footer}
            type={effectiveFooterType}
          />
        ) : (
          footer
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing["200"],
  },
  label: {
    color: colorMaps.face.primary,
  },
});
