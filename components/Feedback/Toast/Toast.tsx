import React, { useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { AlertCircleIcon } from "../../icons/AlertCircleIcon";
import { XCloseIcon } from "../../icons/XCloseIcon";
import { colorMaps, spacing, radius } from "../../tokens";

export type ToastType = "info" | "success" | "error";

export interface ToastProps {
  message?: string;
  type?: ToastType;
  leadingSlot?: React.ReactNode;
  showIcon?: boolean;
  dismissable?: boolean;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
  animated?: boolean;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const TYPE_STYLES = {
  info: {
    background: colorMaps.object.secondary.default,
    fill: colorMaps.object.secondary.pressed,
    border: colorMaps.border.secondary,
  },
  success: {
    background: colorMaps.object.positive.subtle.default,
    fill: colorMaps.object.positive.subtle.pressed,
    border: colorMaps.border.positive,
  },
  error: {
    background: colorMaps.object.negative.subtle.default,
    fill: colorMaps.object.negative.subtle.pressed,
    border: colorMaps.border.negative,
  },
} as const;

function DefaultIcon({ type }: { type: ToastType }) {
  const size = 16;

  switch (type) {
    case "success":
      return (
        <CheckCircleIcon
          width={size}
          height={size}
          color={colorMaps.face.positiveBold}
        />
      );
    case "error":
      return (
        <AlertCircleIcon
          width={size}
          height={size}
          color={colorMaps.face.negativeBold}
        />
      );
    case "info":
    default:
      return (
        <CheckCircleIcon
          width={size}
          height={size}
          color={colorMaps.face.primary}
        />
      );
  }
}

export default function Toast({
  message = "Info message...",
  type = "info",
  leadingSlot,
  showIcon = true,
  dismissable = false,
  autoDismiss = false,
  autoDismissDelay = 5000,
  animated = true,
  onDismiss,
  style,
  testID,
}: ToastProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const fillAnim = useRef(new Animated.Value(0)).current;
  const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const typeStyle = TYPE_STYLES[type];

  const handleDismiss = useCallback(() => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -12,
        duration: 200,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  }, [fadeAnim, translateY, onDismiss]);

  // Interpolate fill width from 0% to 100%
  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // Entrance animation
  useEffect(() => {
    if (animated) {
      // Reset fill animation
      fillAnim.setValue(0);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After entrance, animate fill from left to right
        Animated.timing(fillAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: false, // width animation requires JS driver
        }).start();
      });
    } else {
      fadeAnim.setValue(1);
      translateY.setValue(0);
      fillAnim.setValue(1);
    }
  }, [animated, fadeAnim, translateY, fillAnim]);

  // Auto dismiss
  useEffect(() => {
    if (autoDismiss) {
      dismissTimeoutRef.current = setTimeout(() => {
        handleDismiss();
      }, autoDismissDelay);

      return () => {
        if (dismissTimeoutRef.current) {
          clearTimeout(dismissTimeoutRef.current);
        }
      };
    }
  }, [autoDismiss, autoDismissDelay, handleDismiss]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: typeStyle.background,
            borderColor: typeStyle.border,
          },
          style,
        ]}
      >
        {/* Fill overlay that animates left to right */}
        <Animated.View
          style={[
            styles.fillOverlay,
            {
              backgroundColor: typeStyle.fill,
              width: fillWidth,
            },
          ]}
        />

        {/* Content wrapper to ensure it's above the fill overlay */}
        <View style={styles.contentWrapper}>
          {showIcon && (
            <View style={styles.iconWrapper}>
              {leadingSlot || <DefaultIcon type={type} />}
            </View>
          )}

          <View style={styles.textContainer}>
            <FoldText type="body-md-bold" style={styles.messageText}>
              {message}
            </FoldText>
          </View>

          {dismissable && (
            <Pressable
              onPress={handleDismiss}
              style={styles.dismissButton}
              hitSlop={8}
            >
              <XCloseIcon
                width={16}
                height={16}
                color={colorMaps.face.secondary}
              />
            </Pressable>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
  },
  container: {
    borderRadius: radius.lg,
    borderWidth: 0.5,
    overflow: "hidden",
    shadowColor: "rgba(194, 194, 194, 0.12)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 3,
  },
  fillOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 0,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing["400"],
    paddingVertical: 14,
    gap: spacing["200"],
    zIndex: 1,
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  messageText: {
    color: colorMaps.face.primary,
  },
  dismissButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
