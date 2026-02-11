import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, ScrollView, Animated, Dimensions, Keyboard, Platform } from "react-native";
import { colorMaps, spacing } from "../../components/tokens";
import FoldPageViewHeader from "../../components/Navigation/TopNav/FoldPageViewHeader";

export type NavVariant = "start" | "step";
export type EnterAnimation = "slide" | "fill" | "none";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export interface FullscreenTemplateRef {
  close: () => void;
}

interface FullscreenTemplateProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  navVariant?: NavVariant;
  leftIcon?: string | "back" | "menu" | "x" | "chevron-left";
  onLeftPress?: () => void;
  rightIcon?: string | "x";
  onRightPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  rightComponents?: React.ReactNode[];
  onTabPress?: (tab: "left" | "center" | "right" | "notifications") => void;
  scrollable?: boolean;
  variant?: "fullscreen" | "progressive" | "yellow";
  step?: React.ReactNode;
  /** Footer content to display at the bottom of the screen */
  footer?: React.ReactNode;
  /** Animation type for entering the screen */
  enterAnimation?: EnterAnimation;
  /** Disable entrance slide animation for "start" variant */
  disableEntranceAnimation?: boolean;
  /** Disable slide animation for "start" variant (both entrance and exit) */
  disableAnimation?: boolean;
  /** When true, footer moves inside ScrollView and keyboard auto-scrolls to focused input */
  keyboardAware?: boolean;
}

const FullscreenTemplate = forwardRef<FullscreenTemplateRef, FullscreenTemplateProps>(({
  children,
  title,
  subTitle,
  navVariant = "start",
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  leftComponent,
  rightComponent,
  rightComponents = [],
  scrollable = true,
  variant = "fullscreen",
  step,
  footer,
  enterAnimation,
  disableEntranceAnimation = false,
  disableAnimation = false,
  keyboardAware = false,
}, ref) => {
  const ContentWrapper = scrollable ? ScrollView : View;
  const isYellow = variant === "yellow";
  const headerVariant = isYellow ? "fullscreen" : variant;

  // Keyboard height tracking for keyboardAware mode
  const keyboardAnim = useRef(new Animated.Value(0)).current;
  const keyboardScrollRef = useRef<ScrollView>(null);
  const keyboardHeightRef = useRef(0);
  useEffect(() => {
    if (!keyboardAware) return;
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, (e) => {
      keyboardHeightRef.current = e.endCoordinates.height;
      Animated.timing(keyboardAnim, {
        toValue: e.endCoordinates.height,
        duration: e.duration || 250,
        useNativeDriver: false,
      }).start(() => {
        // After layout settles, scroll focused input into view
        keyboardScrollRef.current?.scrollToEnd({ animated: true });
      });
    });
    const hideSub = Keyboard.addListener(hideEvent, (e) => {
      keyboardHeightRef.current = 0;
      Animated.timing(keyboardAnim, {
        toValue: 0,
        duration: e.duration || 250,
        useNativeDriver: false,
      }).start();
    });
    return () => { showSub.remove(); hideSub.remove(); };
  }, [keyboardAware]);

  // Determine left icon based on navVariant or explicit leftIcon
  const resolvedLeftIcon = leftIcon ?? (navVariant === "step" ? "chevron-left" : "x");

  // Animation setup based on navVariant
  const isStartVariant = navVariant === "start";
  const isStepVariant = navVariant === "step";

  // Resolve animation type
  const resolvedEnterAnimation: EnterAnimation = enterAnimation ??
    (disableAnimation || disableEntranceAnimation ? "none" : "slide");

  const isFillAnimation = resolvedEnterAnimation === "fill";
  const isSlideAnimation = resolvedEnterAnimation === "slide";
  const shouldAnimate = resolvedEnterAnimation !== "none";

  // Determine if we should animate exit
  const shouldAnimateExit = !disableAnimation && isSlideAnimation;

  // Use different initial values based on animation type
  const getInitialSlideValue = () => {
    if (!isSlideAnimation) return 0;
    if (isStartVariant) return screenHeight; // slide from bottom
    if (isStepVariant) return screenWidth; // slide from right
    return 0;
  };

  const slideAnim = useRef(new Animated.Value(getInitialSlideValue())).current;
  const fillAnim = useRef(new Animated.Value(isFillAnimation ? 0 : 1)).current;
  const isAnimatingOut = useRef(false);

  useEffect(() => {
    if (isSlideAnimation) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 12,
      }).start();
    } else if (isFillAnimation) {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false, // height animation can't use native driver
      }).start();
    }
  }, []);

  const triggerClose = () => {
    if (shouldAnimateExit && onLeftPress && !isAnimatingOut.current) {
      isAnimatingOut.current = true;
      const exitValue = isStartVariant ? screenHeight : screenWidth;
      Animated.timing(slideAnim, {
        toValue: exitValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onLeftPress();
      });
    } else if (onLeftPress) {
      onLeftPress();
    }
  };

  // Expose close method via ref
  useImperativeHandle(ref, () => ({
    close: triggerClose,
  }));

  const handleLeftPress = triggerClose;

  const content = (
    <View style={[styles.container, isYellow && styles.containerYellow]}>
      {/* Header */}
      <FoldPageViewHeader
        title={title}
        subTitle={subTitle}
        leftIcon={resolvedLeftIcon}
        onLeftPress={handleLeftPress}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        rightComponents={rightComponents}
        variant={headerVariant}
        marginBottom={0}
        step={step}
      />

      {keyboardAware && scrollable ? (
        /* Keyboard-aware mode: animated paddingBottom = keyboard height
           pushes footer above keyboard, ScrollView fills remaining space */
        <Animated.View style={[styles.content, { paddingBottom: keyboardAnim }]}>
          <ScrollView
            ref={keyboardScrollRef}
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
          {footer}
        </Animated.View>
      ) : keyboardAware && !scrollable ? (
        /* Keyboard-aware non-scrollable: animated paddingBottom shrinks content,
           footer stays visible above keyboard */
        <Animated.View style={[styles.content, { paddingBottom: keyboardAnim }]}>
          <View style={styles.content}>
            {children}
          </View>
          {footer}
        </Animated.View>
      ) : (
        <>
          {/* Content Slot */}
          <ContentWrapper
            style={styles.content}
            contentContainerStyle={scrollable ? styles.scrollContent : undefined}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ContentWrapper>

          {/* Footer */}
          {footer}
        </>
      )}
    </View>
  );

  // Determine transform based on variant
  const getTransform = () => {
    if (isStartVariant) {
      return [{ translateY: slideAnim }];
    }
    if (isStepVariant) {
      return [{ translateX: slideAnim }];
    }
    return [];
  };

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
            isYellow && styles.containerYellow,
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
          { transform: getTransform() },
        ]}
      >
        {content}
      </Animated.View>
    );
  }

  // No animation but still need positioned container for proper z-index
  if (isStartVariant || isStepVariant) {
    return (
      <View style={styles.animatedContainer}>
        {content}
      </View>
    );
  }

  return content;
});

export default FullscreenTemplate;

const styles = StyleSheet.create({
  animatedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: colorMaps.layer.background,
  },
  fillBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colorMaps.layer.background,
  },
  fillContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  containerYellow: {
    backgroundColor: colorMaps.object.primary.bold.default,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing["600"], // Extra padding at the bottom for scrollable content
  },
});
