import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import TextContainer, { TextContainerProps } from "./TextContainer";
import Footnote, { FootnoteType } from "../footnote/Footnote";
import { colorMaps, spacing } from "../../tokens";

export interface TextFieldProps extends TextContainerProps {
  label?: string | React.ReactNode;
  isOptional?: boolean;
  footer?: string | React.ReactNode;
  footerType?: FootnoteType;
  containerStyle?: ViewStyle;
  secureTextEntry?: boolean;
}

export default function TextField({
  label,
  isOptional = false,
  footer,
  footerType = "info",
  containerStyle,
  error,
  state,
  secureTextEntry,
  ...textContainerProps
}: TextFieldProps) {
  const isError = error || state === "error";
  const effectiveFooterType = isError ? "error" : footerType;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        typeof label === "string" ? (
          <View style={styles.labelRow}>
            <FoldText type="body-md-bold" style={styles.label}>
              {label}
            </FoldText>
            {isOptional && (
              <FoldText type="body-md" style={styles.optionalText}>
                (optional)
              </FoldText>
            )}
          </View>
        ) : (
          label
        )
      )}

      <TextContainer error={error} state={state} secureTextEntry={secureTextEntry} {...textContainerProps} />

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
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["100"],
  },
  label: {
    color: colorMaps.face.secondary,
  },
  optionalText: {
    color: colorMaps.face.disabled,
  },
});
