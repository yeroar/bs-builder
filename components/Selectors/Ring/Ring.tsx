import React, { useRef } from "react";
import { View, StyleSheet, PanResponder, GestureResponderEvent } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, colorPrimitives, spacing } from "../../tokens";

export interface RingProps {
  /** Percentage value from 0-100 */
  percentage?: number;
  size?: number;
  onChange?: (percentage: number) => void;
}

function angleToProgress(angle: number): number {
  // Normalize angle to 0-1 range (starting from top, going clockwise)
  let normalized = (angle + Math.PI / 2) / (2 * Math.PI);
  if (normalized < 0) normalized += 1;
  if (normalized > 1) normalized -= 1;
  return normalized;
}

export default function Ring({ percentage = 0, size = 335, onChange }: RingProps) {
  const margin = 20;
  const totalSize = size + margin * 2;
  const strokeWidth = 8;
  const handleOuterRadius = 12;
  const handleInnerRadius = 6; // 6px white space
  const radius = (size - strokeWidth) / 2;
  const center = totalSize / 2;
  const circumference = 2 * Math.PI * radius;

  // Convert percentage (0-100) to progress (0-1)
  const progress = Math.max(0, Math.min(100, percentage)) / 100;

  // Calculate the arc
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - progress);

  // Calculate handle position (start from top, go clockwise)
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const handleX = center + radius * Math.cos(angle);
  const handleY = center + radius * Math.sin(angle);

  const handleGesture = (evt: GestureResponderEvent) => {
    if (!onChange) return;

    const { locationX, locationY } = evt.nativeEvent;

    // Calculate angle from center
    const dx = locationX - center;
    const dy = locationY - center;
    const touchAngle = Math.atan2(dy, dx);

    // Convert to continuous percentage (0-100)
    const touchProgress = angleToProgress(touchAngle);
    const newPercentage = Math.round(touchProgress * 100);

    if (newPercentage !== percentage) {
      onChange(newPercentage);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handleGesture,
      onPanResponderMove: handleGesture,
    })
  ).current;

  return (
    <View
      style={[styles.container, { width: totalSize, height: totalSize }]}
      {...panResponder.panHandlers}
    >
      <Svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`}>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colorPrimitives.gray["200"]}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress arc */}
        {progress > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colorPrimitives.yellow["300"]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
          />
        )}

        {/* Handle - Yellow donut with 6px white space inside */}
        <G>
          {/* Outer yellow circle */}
          <Circle
            cx={handleX}
            cy={handleY}
            r={handleOuterRadius}
            fill={colorPrimitives.yellow["300"]}
          />
          {/* Inner white circle (6px white space) */}
          <Circle
            cx={handleX}
            cy={handleY}
            r={handleInnerRadius}
            fill={colorPrimitives.gray["000"]}
          />
        </G>
      </Svg>

      {/* Center content */}
      <View style={[styles.content, { width: size * 0.8 }]} pointerEvents="none">
        <FoldText type="display-lg" style={styles.percentageText}>
          {percentage}%
        </FoldText>
        <FoldText type="body-md" style={styles.label}>
          of each paycheck to bitcoin
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  content: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["400"],
    overflow: "visible",
  },
  percentageText: {
    color: colorMaps.face.primary,
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -1,
    textAlign: "center",
    overflow: "visible",
  },
  label: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
});
