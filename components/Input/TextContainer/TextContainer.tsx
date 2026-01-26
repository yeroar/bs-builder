import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  Pressable,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import {
  colorMaps,
  spacing,
  radius,
  typographyStyles,
} from "../../tokens";

export type TextContainerState = "empty" | "focused" | "typing" | "filled" | "error";

export interface TextContainerProps {
  state?: TextContainerState;
  value?: string;
  placeholder?: string;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  multiline?: boolean;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  error?: boolean;
  autoFocus?: boolean;
  testID?: string;
}

export default function TextContainer({
  state: controlledState,
  value: controlledValue,
  placeholder = "Input",
  leadingSlot,
  trailingSlot,
  multiline = false,
  editable = true,
  onChangeText,
  onFocus,
  onBlur,
  onPress,
  style,
  inputStyle,
  error = false,
  autoFocus = false,
  testID,
}: TextContainerProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(controlledValue || "");
  const inputRef = useRef<RNTextInput>(null);

  // Determine current state
  const currentState = controlledState || (error
    ? "error"
    : focused
    ? value.length > 0
      ? "typing"
      : "focused"
    : value.length > 0
    ? "filled"
    : "empty"
  );

  // Sync controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChangeText = useCallback((text: string) => {
    setValue(text);
    onChangeText?.(text);
  }, [onChangeText]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur?.();
  }, [onBlur]);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else if (editable) {
      inputRef.current?.focus();
    }
  }, [onPress, editable]);

  // Memoize styles based on current state
  const containerStyle = useMemo(() => getContainerStyle(currentState), [currentState]);
  const textColor = useMemo(() => getTextColor(currentState, value), [currentState, value]);
  const highlightStyle = useMemo(() => getHighlightStyle(currentState), [currentState]);

  // Memoize input style to prevent re-renders
  const inputTextStyle = useMemo(
    () => [styles.input, { color: textColor }, inputStyle],
    [textColor, inputStyle]
  );
  const readOnlyTextStyle = useMemo(
    () => [styles.text, { color: textColor }],
    [textColor]
  );

  return (
    <View style={[styles.container, containerStyle, style]} testID={testID}>
      {/* Leading slot */}
      {leadingSlot && (
        <View style={styles.slotWrapper}>
          {leadingSlot}
        </View>
      )}

      {/* Input content */}
      <View style={styles.inputContainer}>
        {editable ? (
          <RNTextInput
            ref={inputRef}
            style={inputTextStyle}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colorMaps.face.disabled}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            multiline={multiline}
            autoFocus={autoFocus}
            editable={editable}
          />
        ) : (
          <Pressable onPress={handlePress}>
            <FoldText
              type="body-md"
              style={readOnlyTextStyle}
            >
              {value || placeholder}
            </FoldText>
          </Pressable>
        )}
      </View>

      {/* Trailing slot */}
      {trailingSlot && (
        <View style={styles.slotWrapper}>
          {trailingSlot}
        </View>
      )}

      {/* Highlight border for focused/error states */}
      {highlightStyle !== null && <View style={[styles.highlight, highlightStyle]} />}
    </View>
  );
}

function getContainerStyle(state: TextContainerState): ViewStyle {
  const isHighContrast = ["focused", "typing", "error"].includes(state);
  
  return {
    backgroundColor: isHighContrast ? colorMaps.special.offWhite : colorMaps.object.tertiary.default,
    borderColor: colorMaps.border.tertiary,
  };
}

function getTextColor(state: TextContainerState, value: string): string {
  if (state === "empty" && value.length === 0) {
    return colorMaps.face.disabled;
  }
  return colorMaps.face.primary;
}

function getHighlightStyle(state: TextContainerState): ViewStyle | null {
  switch (state) {
    case "focused":
    case "typing":
      return {
        borderColor: colorMaps.border.focused,
      };
    case "error":
      return {
        borderColor: colorMaps.border.negative,
      };
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
    paddingHorizontal: spacing["400"],
    paddingVertical: spacing["300"],
    borderWidth: 1,
    borderRadius: radius.lg,
    height: 56,
    position: "relative",
  },
  slotWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    ...typographyStyles["body-md"],
    lineHeight: undefined,
    paddingVertical: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  text: {
    ...typographyStyles["body-md"],
  },
  highlight: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderWidth: 1.5,
    borderRadius: radius.lg + 2,
    pointerEvents: "none",
  },
});
