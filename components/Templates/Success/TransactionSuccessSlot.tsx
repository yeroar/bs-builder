import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { colorMaps, spacing } from "../../tokens";

const screenHeight = Dimensions.get("window").height;

export interface TransactionSuccessSlotRef {
  close: (onComplete?: () => void) => void;
}

export interface TransactionSuccessSlotProps {
  /** Header slot (FoldPageViewHeader) */
  header: React.ReactNode;
  /** Content to display (CurrencyInput, buttons, etc.) */
  children: React.ReactNode;
  /** Footer slot (ModalFooter with buttons) */
  footer: React.ReactNode;
  /** Enable slide-up animation */
  animated?: boolean;
  testID?: string;
}

const TransactionSuccessSlot = forwardRef<TransactionSuccessSlotRef, TransactionSuccessSlotProps>(({
  header,
  children,
  footer,
  animated = true,
  testID,
}, ref) => {
  const slideAnim = useRef(new Animated.Value(animated ? screenHeight : 0)).current;
  const isAnimatingOut = useRef(false);

  useEffect(() => {
    if (animated) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, []);

  const triggerClose = (onComplete?: () => void) => {
    if (animated && !isAnimatingOut.current) {
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

  if (animated) {
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

  return (
    <View style={styles.animatedContainer}>
      {content}
    </View>
  );
});

export default TransactionSuccessSlot;

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
