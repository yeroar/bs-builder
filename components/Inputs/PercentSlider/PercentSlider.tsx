/**
 * PercentSlider — Fuse-style percentage slider with snap points.
 *
 * Benchmark: Fuse Slider + MAX (node 22:552)
 * Track with 5 labeled stops (0%, 25%, 50%, 75%, 100%),
 * dot indicators, and a draggable thumb that snaps to nearest stop.
 */
import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing } from "../../tokens";

const STOPS = [0, 25, 50, 75, 100];

export interface PercentSliderProps {
  value: number;
  onValueChange: (percent: number) => void;
}

export default function PercentSlider({ value, onValueChange }: PercentSliderProps) {
  const trackWidth = useRef(0);
  const [layoutReady, setLayoutReady] = useState(false);

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const snapToNearest = (pct: number) => {
    let closest = STOPS[0];
    let minDist = Math.abs(pct - closest);
    for (const s of STOPS) {
      const d = Math.abs(pct - s);
      if (d < minDist) {
        minDist = d;
        closest = s;
      }
    }
    return closest;
  };

  const pctFromGesture = (evt: GestureResponderEvent) => {
    const x = evt.nativeEvent.locationX;
    const raw = (x / trackWidth.current) * 100;
    return clamp(raw, 0, 100);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const pct = pctFromGesture(evt);
        onValueChange(snapToNearest(pct));
      },
      onPanResponderMove: (evt) => {
        const pct = pctFromGesture(evt);
        onValueChange(snapToNearest(pct));
      },
      onPanResponderRelease: (evt) => {
        const pct = pctFromGesture(evt);
        onValueChange(snapToNearest(pct));
      },
    })
  ).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
    setLayoutReady(true);
  };

  const thumbLeft = (value / 100) * trackWidth.current;
  const filledWidth = thumbLeft;

  return (
    <View style={styles.container}>
      {/* Labels */}
      <View style={styles.labels}>
        {STOPS.map((s) => (
          <FoldText
            key={s}
            type="body-sm"
            style={[styles.label, value >= s && styles.labelActive]}
          >
            {s}%
          </FoldText>
        ))}
      </View>

      {/* Track */}
      <View
        style={styles.trackHitArea}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Background track */}
        <View style={styles.track}>
          {/* Filled portion */}
          <View style={[styles.trackFilled, { width: filledWidth }]} />
        </View>

        {/* Dots */}
        {layoutReady &&
          STOPS.map((s) => {
            const left = (s / 100) * trackWidth.current - 4;
            const active = value >= s;
            return (
              <View
                key={s}
                style={[
                  styles.dot,
                  { left },
                  active && styles.dotActive,
                ]}
              />
            );
          })}

        {/* Thumb */}
        {layoutReady && (
          <View style={[styles.thumb, { left: thumbLeft - 12 }]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["200"],
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: colorMaps.face.disabled,
  },
  labelActive: {
    color: colorMaps.face.secondary,
  },
  trackHitArea: {
    height: 32,
    justifyContent: "center",
  },
  track: {
    height: 2,
    backgroundColor: colorMaps.border.secondary,
    borderRadius: 1,
  },
  trackFilled: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 2,
    backgroundColor: colorMaps.face.secondary,
    borderRadius: 1,
  },
  dot: {
    position: "absolute",
    top: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colorMaps.border.secondary,
  },
  dotActive: {
    backgroundColor: colorMaps.face.secondary,
  },
  thumb: {
    position: "absolute",
    top: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colorMaps.layer.background,
    borderWidth: 2,
    borderColor: colorMaps.border.secondary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
