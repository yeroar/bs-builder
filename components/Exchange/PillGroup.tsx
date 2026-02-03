import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  LayoutChangeEvent,
  ViewStyle,
} from "react-native";
import { colorPrimitives } from "../tokens/colorPrimitives";
import { spacing } from "../tokens";
import PillSelector from "../PillSelector/PillSelector";
import { TimeRange } from "./PriceChart";

export interface PillGroupProps {
  active?: TimeRange;
  onSelect?: (active: TimeRange) => void;
  variant?: "onLight" | "onBrand";
  style?: ViewStyle;
  testID?: string;
}

const OPTIONS: { label: string; active: TimeRange }[] = [
  { label: "24H", active: "24H" },
  { label: "1W", active: "1W" },
  { label: "1M", active: "1M" },
  { label: "1Y", active: "1Y" },
  { label: "ALL", active: "ALL" },
];

export default function PillGroup({
  active = "ALL",
  onSelect,
  variant = "onLight",
  style,
  testID,
}: PillGroupProps) {
  const selectedIndex = OPTIONS.findIndex((o) => o.active === active);

  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(selectedIndex)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selectedIndex,
      useNativeDriver: true,
      tension: 30, // Subtle start
      friction: 12, // Smooth finish, no bounce
    }).start();
  }, [selectedIndex, slideAnim]);

  const handleSelect = (index: number) => {
    onSelect?.(OPTIONS[index].active!);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const pillWidth =
    containerWidth > 0 ? (containerWidth - spacing["200"] * 2) / OPTIONS.length : 0;

  const translateX = slideAnim.interpolate({
    inputRange: OPTIONS.map((_, i) => i),
    outputRange: OPTIONS.map((_, i) => i * pillWidth),
  });

  return (
    <View style={[styles.container, style]} onLayout={handleLayout} testID={testID}>
      <View style={styles.background} />
      {pillWidth > 0 && (
        <Animated.View
          style={[
            styles.slider,
            {
              width: pillWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
      {OPTIONS.map((option, index) => (
        <View key={option.active} style={styles.pillWrapper}>
          <PillSelector
            label={option.label}
            isActive={selectedIndex === index}
            onPress={() => handleSelect(index)}
            variant={variant === "onBrand" ? "transparent" : variant}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing["200"],
    paddingHorizontal: spacing["200"],
    paddingVertical: 0,
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(232, 190, 17, 0.0)",
    borderRadius: 24,
    marginHorizontal: spacing["200"],
  },
  slider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: spacing["200"],
    backgroundColor: colorPrimitives.yellow["400"],
    borderRadius: 24,
  },
  pillWrapper: {
    flex: 1,
  },
});
