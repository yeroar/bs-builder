import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  TextInput as RNTextInput,
  Keyboard,
} from "react-native";
import { SearchMdIcon } from "../../icons/SearchMdIcon";
import { ArrowNarrowLeftIcon } from "../../icons/ArrowNarrowLeftIcon";
import { XCloseIcon } from "../../icons/XCloseIcon";
import { colorMaps, spacing, radius } from "../../tokens";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
  autoFocus?: boolean;
  focus?: boolean;
  onBack?: () => void;
  onFocus?: () => void;
  forceFilledState?: boolean;
  submitted?: boolean;
}

export default function SearchBar({
  value: controlledValue,
  placeholder = "Search brands",
  onChange,
  containerStyle,
  inputStyle,
  testID,
  autoFocus = false,
  focus = false,
  onBack,
  onFocus: onFocusProp,
  forceFilledState = false,
  submitted: controlledSubmitted,
}: SearchBarProps) {
  const [value, setValue] = useState(controlledValue ?? "");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<RNTextInput | null>(null);

  const isSubmitted = controlledSubmitted ?? submitted;

  useEffect(() => {
    if (typeof controlledValue === "string" && controlledValue !== value) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (focus) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [focus]);

  const handleChange = (v: string) => {
    setSubmitted(false);
    setValue(v);
    onChange?.(v);
  };

  const handleClear = () => {
    handleChange("");
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    inputRef.current?.blur();
    Keyboard.dismiss();
    setSubmitted(true);
    setFocused(false);
  };

  const iconSize = focused ? 18 : 16;
  const active = focused; // Only show active state (blue border) when focused
  const filled = (value.length > 0 && !focused) || forceFilledState; // Show filled state when has value but not focused

  // Icons (arrow/close) should be primary when focused, typing, or filled
  const iconColor = (active || filled) ? colorMaps.face.primary : colorMaps.face.disabled;

  const renderIcon = (IconComp: any, colorOverride?: string) => {
    const c =
      IconComp === SearchMdIcon ? colorMaps.face.disabled : colorOverride ?? iconColor;
    return (
      <IconComp
        width={iconSize}
        height={iconSize}
        color={c}
      />
    );
  };

  const leadingIsArrow =
    focused || value.length > 0 || forceFilledState;
  const leadingIcon = leadingIsArrow
    ? renderIcon(ArrowNarrowLeftIcon)
    : renderIcon(SearchMdIcon);

  const showClear = value.length > 0;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View
        style={[
          styles.inputBox,
          active && {
            backgroundColor: colorMaps.special.offWhite,
            borderColor: colorMaps.face.accentBold,
            borderWidth: 1.5,
          },
          filled &&
            !active && {
              backgroundColor: colorMaps.object.tertiary.default,
              borderColor: colorMaps.border.tertiary,
              borderWidth: 1,
            },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (leadingIsArrow && onBack) {
              onBack();
            } else {
              inputRef.current?.focus();
            }
          }}
          style={styles.leading}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {leadingIcon}
        </TouchableOpacity>

        <RNTextInput
          ref={inputRef}
          autoFocus={autoFocus}
          testID={testID}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={colorMaps.face.disabled}
          value={value}
          onChangeText={handleChange}
          onFocus={() => {
            setFocused(true);
            setSubmitted(false);
            onFocusProp?.();
          }}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          keyboardType="default"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />

        {showClear ? (
          <TouchableOpacity
            accessibilityLabel="Clear search"
            onPress={handleClear}
            style={styles.trailing}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {renderIcon(XCloseIcon)}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  inputBox: {
    backgroundColor: colorMaps.object.tertiary.default,
    borderRadius: radius.rounded,
    borderColor: colorMaps.border.tertiary,
    borderWidth: 1,
    paddingHorizontal: spacing["400"],
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["300"],
  },
  leading: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: colorMaps.face.primary,
    fontSize: 14,
    lineHeight: undefined,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  trailing: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
