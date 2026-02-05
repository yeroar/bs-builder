import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { colorMaps, spacing } from "../../../components/tokens";

const screenHeight = Dimensions.get("window").height;

export type EnterAnimation = "slide" | "fill" | "none";

export interface TransactionSuccessRef {
  close: (onComplete?: () => void) => void;
}

export interface TransactionSuccessProps {
  /** Header slot (FoldPageViewHeader) */
  header: React.ReactNode;
  /** Content to display (CurrencyInput, buttons, etc.) */
  children: React.ReactNode;
  /** Footer slot (ModalFooter with buttons) */
  footer: React.ReactNode;
  /** Animation type for entering */
  enterAnimation?: EnterAnimation;
  /** @deprecated Use enterAnimation instead */
  animated?: boolean;
  testID?: string;
}

const TransactionSuccess = forwardRef<TransactionSuccessRef, TransactionSuccessProps>(({
  header,
  children,
  footer,
  enterAnimation,
  animated = true,
  testID,
}, ref) => {
  // Resolve animation type (support legacy animated prop)
  const resolvedAnimation: EnterAnimation = enterAnimation ?? (animated ? "slide" : "none");
  const isSlideAnimation = resolvedAnimation === "slide";
  const isFillAnimation = resolvedAnimation === "fill";
  const shouldAnimate = resolvedAnimation !== "none";

  const slideAnim = useRef(new Animated.Value(isSlideAnimation ? screenHeight : 0)).current;
  const fillAnim = useRef(new Animated.Value(isFillAnimation ? 0 : 1)).current;
  const isAnimatingOut = useRef(false);

  useEffect(() => {
    if (isSlideAnimation) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else if (isFillAnimation) {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, []);

  const triggerClose = (onComplete?: () => void) => {
    if (isSlideAnimation && !isAnimatingOut.current) {
      isAnimatingOut.current = true;
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onComplete?.();
      });
    } else {
      onComplete?.();
    }
  };

  useImperativeHandle(ref, () => ({
    close: triggerClose,
  }));

  const content = (
    <View style={styles.container} testID={testID}>
      {header}

      <View style={styles.content}>
        {children}
      </View>

      {footer}
    </View>
  );

  // Fill animation - background fills, content appears after
  if (isFillAnimation) {
    const animatedHeight = fillAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenHeight],
    });

    const contentOpacity = fillAnim.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });

    return (
      <View style={styles.animatedContainer}>
        {/* Background fill from bottom */}
        <Animated.View
          style={[
            styles.fillBackground,
            { height: animatedHeight },
          ]}
          pointerEvents="none"
        />
        {/* Content appears after fill */}
        <Animated.View style={[styles.fillContent, { opacity: contentOpacity }]}>
          {content}
        </Animated.View>
      </View>
    );
  }

  // Slide animation
  if (isSlideAnimation) {
    return (
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {content}
      </Animated.View>
    );
  }

  // No animation
  return (
    <View style={styles.animatedContainer}>
      {content}
    </View>
  );
});

export default TransactionSuccess;

const styles = StyleSheet.create({
  animatedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  fillBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  fillContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing["400"],
    paddingTop: spacing["600"],
  },
});
