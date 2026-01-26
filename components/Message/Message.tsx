import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../tokens";

export type MessageVariant = "information" | "warning" | "error";

export interface MessageProps {
  title?: string;
  message: string;
  variant?: MessageVariant;
  actionLabel?: string;
  hasButton?: boolean;
  onActionPress?: () => void;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const VARIANT_STYLES = {
  information: {
    background: colorMaps.object.secondary.default,
    border: colorMaps.border.secondary,
    buttonBackground: colorMaps.object.primary.bold.default,
    buttonTextColor: colorMaps.face.primary,
  },
  warning: {
    background: colorMaps.object.primary.subtle.default,
    border: colorMaps.border.primary,
    buttonBackground: colorMaps.object.primary.bold.default,
    buttonTextColor: colorMaps.face.primary,
  },
  error: {
    background: colorMaps.object.negative.subtle.default,
    border: colorMaps.border.negative,
    buttonBackground: colorMaps.object.negative.bold.default,
    buttonTextColor: colorMaps.face.inversePrimary,
  },
} as const;

export default function Message({
  title,
  message,
  variant = "information",
  actionLabel = "Action",
  hasButton = true,
  onActionPress,
  onDismiss,
  style,
  testID,
}: MessageProps) {
  const variantStyle = VARIANT_STYLES[variant];

  const handleActionPress = () => {
    onActionPress?.();
    onDismiss?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyle.background,
          borderColor: variantStyle.border,
        },
        style,
      ]}
      testID={testID}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {title && (
            <FoldText type="body-md-bold" style={styles.titleText}>
              {title}
            </FoldText>
          )}
          <FoldText type="body-md" style={styles.messageText}>
            {message}
          </FoldText>
        </View>

        {hasButton && (
          <Pressable
            onPress={handleActionPress}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: variantStyle.buttonBackground,
                opacity: pressed ? 0.8 : 1,
              },
              variant === "error" && styles.errorButton,
            ]}
          >
            <FoldText
              type="button-sm"
              style={{ color: variantStyle.buttonTextColor }}
            >
              {actionLabel}
            </FoldText>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 0.5,
    overflow: "hidden",
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["500"],
  },
  content: {
    flexDirection: "column",
    gap: spacing["300"],
    paddingRight: spacing["500"],
  },
  textContainer: {
    flexDirection: "column",
    gap: 0,
  },
  titleText: {
    color: colorMaps.face.primary,
  },
  messageText: {
    color: colorMaps.face.secondary,
  },
  actionButton: {
    alignSelf: "flex-start",
    height: 36,
    paddingHorizontal: spacing["200"],
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  errorButton: {
    height: 40,
    borderWidth: 1,
    borderColor: colorMaps.border.negative,
  },
});
