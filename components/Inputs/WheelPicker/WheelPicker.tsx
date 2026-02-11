import React, { useRef, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps } from "../../tokens";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export interface WheelPickerProps {
  /** Array of string values to display */
  items: string[];
  /** Currently selected index */
  selectedIndex?: number;
  /** Called when selection changes */
  onIndexChange?: (index: number) => void;
  /** Optional formatter for display label */
  formatLabel?: (item: string) => string;
  /** Icon rendered next to the selected item */
  actionIcon?: React.ReactNode;
  /** Called when the action icon is pressed */
  onActionPress?: () => void;
}

export default function WheelPicker({
  items,
  selectedIndex = 0,
  onIndexChange,
  formatLabel,
  actionIcon,
  onActionPress,
}: WheelPickerProps) {
  const scrollY = useRef(new Animated.Value(selectedIndex * ITEM_HEIGHT)).current;
  const scrollRef = useRef<any>(null);
  const didMount = useRef(false);

  // Scroll to initial index on mount
  useEffect(() => {
    if (!didMount.current && selectedIndex > 0) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: selectedIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 50);
    }
    didMount.current = true;
  }, []);

  const handleMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      onIndexChange?.(clamped);
    },
    [items.length, onIndexChange]
  );

  const paddingVertical = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

  return (
    <View style={styles.wrapper}>
      <View style={styles.scrollContainer}>
        {/* Selection highlight band */}
        <View style={styles.selectionBand} pointerEvents="none" />

        <Animated.ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleMomentumEnd}
        >
          {items.map((item, index) => {
            const center = index * ITEM_HEIGHT;
            const inputRange = [
              center - 2 * ITEM_HEIGHT,
              center - ITEM_HEIGHT,
              center,
              center + ITEM_HEIGHT,
              center + 2 * ITEM_HEIGHT,
            ];

            const scaleY = scrollY.interpolate({
              inputRange,
              outputRange: [0.57, 0.75, 1, 0.75, 0.57],
              extrapolate: "clamp",
            });

            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [0.25, 0.45, 1, 0.45, 0.25],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={item}
                style={[
                  styles.item,
                  { transform: [{ scaleY }], opacity },
                ]}
              >
                <FoldText type="header-xl" style={styles.itemText}>
                  {formatLabel ? formatLabel(item) : item}
                </FoldText>
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>

      {/* Action icon — right of the wheel */}
      {actionIcon && (
        <Pressable style={styles.actionButton} onPress={onActionPress}>
          <View style={styles.actionCircle}>
            {actionIcon}
          </View>
        </Pressable>
      )}
    </View>
  );
}

const BAND_TOP = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: CONTAINER_HEIGHT,
  },
  scrollContainer: {
    flex: 1,
    height: CONTAINER_HEIGHT,
    overflow: "hidden",
  },
  selectionBand: {
    position: "absolute",
    top: BAND_TOP,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorMaps.border.tertiary,
    zIndex: 1,
  },
  actionButton: {
    justifyContent: "center",
    marginLeft: 12,
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: colorMaps.face.primary,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1,
  },
});
