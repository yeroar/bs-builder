import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { XCloseIcon } from "../icons/XCloseIcon";
import { colorMaps, spacing, radius } from "../tokens";
import Keypad from "../Keypad/Keypad";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface MiniModalProps {
  title?: string;
  header?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "keyboard";
  showHeader?: boolean;
  style?: ViewStyle;
  testID?: string;
  onNumberPress?: (num: string) => void;
  onDecimalPress?: () => void;
  onBackspacePress?: () => void;
}

/**
 * MiniModal component that renders as a bottom-up sheet.
 * Features timing-based animations for appearing and disappearing.
 */
export default function MiniModal({
  title = "Notifications",
  header,
  onClose,
  children,
  footer,
  variant = "default",
  showHeader = true,
  style,
  testID,
  onNumberPress,
  onDecimalPress,
  onBackspacePress,
}: MiniModalProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [hasMeasured, setHasMeasured] = useState(false);

  // Animate in on mount
  useEffect(() => {
    // If it's a keyboard variant, we want to be snappy to match the system keyboard
    if (variant === "keyboard") {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, []);

  // Measure and animate in (fallback or for dynamic height adjustment)
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && !hasMeasured) {
      setHasMeasured(true);
      // If not already animated by variant check, do it here
      if (variant !== "keyboard") {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 12,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  // Animate out then call prop onClose
  const handleClose = () => {
    // Dismiss keyboard simultaneously for synced disappearance
    if (variant === "keyboard") {
      Keyboard.dismiss();
    }

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  return (
    <View style={styles.overlay} testID={testID}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.4],
              }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.container, style]}
      >
        <Animated.View
          onLayout={onLayout}
          style={[
            styles.sheetContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Handle - Visual indicator for bottom sheets */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.sheetContent}>
            {/* Header Section: Custom or Default */}
            {showHeader && (
              header ? (
                <View style={styles.headerWrapper}>
                  {header}
                </View>
              ) : (
                <View style={styles.header}>
                  <View style={styles.headerSide}>
                    <Pressable onPress={handleClose} style={styles.closeButton}>
                      <XCloseIcon width={24} height={24} color={colorMaps.face.primary} />
                    </Pressable>
                  </View>

                  <View style={styles.headerCenter}>
                    <FoldText type="header-xxs" style={styles.title}>
                      {title}
                    </FoldText>
                  </View>

                  <View style={styles.headerSide} />
                </View>
              )
            )}

            {/* Content area */}
            <View style={styles.content}>
              {children}
            </View>

            {/* Embedded Keypad for keyboard variant */}
            {variant === "keyboard" && (onNumberPress || onBackspacePress) && (
              <Keypad
                onNumberPress={onNumberPress}
                onDecimalPress={onDecimalPress}
                onBackspacePress={onBackspacePress}
                style={styles.embeddedKeypad}
              />
            )}

            {/* Optional Footer area */}
            {footer && (
              <View style={styles.footerWrapper}>
                {React.isValidElement(footer)
                  ? React.cloneElement(footer, { modalVariant: variant } as any)
                  : footer}
              </View>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  container: {
    width: "100%",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    width: "100%",
  },
  handleContainer: {
    alignItems: "center",
    paddingBottom: spacing["200"],
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colorMaps.object.primary.bold.default,
    borderRadius: 2,
  },
  sheetContent: {
    backgroundColor: colorMaps.layer.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingTop: spacing["300"],
    overflow: "hidden",
  },
  headerWrapper: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingHorizontal: spacing["500"],
  },
  headerSide: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    padding: spacing["100"],
    marginLeft: -spacing["100"],
  },
  title: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
  content: {
    padding: spacing["500"],
  },
  footerWrapper: {
    borderTopWidth: 0,
  },
  embeddedKeypad: {
    paddingBottom: spacing["400"],
  },
});
