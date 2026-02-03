import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { colorMaps } from "../tokens";

const screenWidth = Dimensions.get("window").width;

export interface ScreenStackProps {
  /** Array of screen keys representing the navigation stack */
  stack: string[];
  /** Render function that returns the screen component for a given key */
  renderScreen: (key: string) => React.ReactNode;
  /** Called when back animation completes - parent should update stack */
  onBack?: () => void;
  /** Animate the initial screen(s) when stack first mounts */
  animateInitial?: boolean;
  /** Called when the last screen finishes animating out (stack becomes empty) */
  onEmpty?: () => void;
  /** Make screen backgrounds transparent (useful when content handles its own background/animation) */
  transparentBackground?: boolean;
}

interface ScreenState {
  key: string;
  animValue: Animated.Value;
  isExiting: boolean;
}

export default function ScreenStack({
  stack,
  renderScreen,
  onBack,
  animateInitial = false,
  onEmpty,
  transparentBackground = false,
}: ScreenStackProps) {
  const [screens, setScreens] = useState<ScreenState[]>(() =>
    stack.map(key => ({
      key,
      animValue: new Animated.Value(animateInitial ? screenWidth : 0),
      isExiting: false
    }))
  );
  const prevStackRef = useRef<string[]>(stack);
  const hasAnimatedInitial = useRef(false);

  // Animate initial screens on mount
  useEffect(() => {
    if (animateInitial && !hasAnimatedInitial.current && screens.length > 0) {
      hasAnimatedInitial.current = true;
      // Animate all initial screens in from right
      screens.forEach(screen => {
        Animated.spring(screen.animValue, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }).start();
      });
    }
  }, []);

  useEffect(() => {
    const prevStack = prevStackRef.current;

    if (stack.length > prevStack.length) {
      // Push (forward) - new screen comes from RIGHT, moves to center
      const newKey = stack[stack.length - 1];
      const newAnimValue = new Animated.Value(screenWidth);

      setScreens(prev => [
        ...prev,
        { key: newKey, animValue: newAnimValue, isExiting: false }
      ]);

      // Animate in from right to center
      Animated.spring(newAnimValue, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();

    } else if (stack.length < prevStack.length && screens.length > 0) {
      // Pop (back) - current screen goes to RIGHT
      const topScreen = screens[screens.length - 1];

      // Mark as exiting
      setScreens(prev =>
        prev.map((s, i) =>
          i === prev.length - 1 ? { ...s, isExiting: true } : s
        )
      );

      // Animate out from center to right
      Animated.timing(topScreen.animValue, {
        toValue: screenWidth,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // Remove the screen after animation
        setScreens(prev => {
          const newScreens = prev.slice(0, -1);
          // Call onEmpty if this was the last screen
          if (newScreens.length === 0 && onEmpty) {
            setTimeout(() => onEmpty(), 0);
          }
          return newScreens;
        });
      });
    }

    prevStackRef.current = stack;
  }, [stack]);

  if (screens.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {screens.map((screen, index) => (
        <Animated.View
          key={screen.key}
          style={[
            styles.screen,
            transparentBackground && styles.screenTransparent,
            {
              zIndex: index,
              transform: [{ translateX: screen.animValue }],
            },
          ]}
        >
          {renderScreen(screen.key)}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colorMaps.layer.background,
  },
  screenTransparent: {
    backgroundColor: "transparent",
  },
});
