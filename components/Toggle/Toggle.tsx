import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ViewStyle,
  Animated,
} from "react-native";
import { colorMaps, radius } from "../tokens";

export interface ToggleProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const KNOB_SIZE = 28;
const KNOB_MARGIN = 2;

export default function Toggle({
  value = false,
  onValueChange,
  disabled = false,
  style,
  testID,
}: ToggleProps) {
  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  const knobTranslateX = value ? TRACK_WIDTH - KNOB_SIZE - KNOB_MARGIN * 2 : 0;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.track,
        value ? styles.trackOn : styles.trackOff,
        disabled && styles.trackDisabled,
        style,
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.knob,
          { transform: [{ translateX: knobTranslateX }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radius.rounded,
    paddingVertical: KNOB_MARGIN,
    paddingHorizontal: KNOB_MARGIN,
    justifyContent: "center",
  },
  trackOn: {
    backgroundColor: colorMaps.object.accent.bold.default,
  },
  trackOff: {
    backgroundColor: colorMaps.object.disabled.disabled,
  },
  trackDisabled: {
    opacity: 0.5,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: radius.rounded,
    backgroundColor: colorMaps.special.offWhite,
    shadowColor: colorMaps.face.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
