import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import KeypadButton from "./KeypadButton";
import ModalFooter from "../Modals/ModalFooter";
import Button from "../Primitives/Buttons/Button/Button";
import { colorMaps, spacing } from "../tokens";

export interface KeypadProps {
  onNumberPress?: (num: string) => void;
  onDecimalPress?: () => void;
  onBackspacePress?: () => void;
  disableDecimal?: boolean;
  actionBar?: boolean;
  actionLabel?: string;
  actionDisabled?: boolean;
  onActionPress?: () => void;
  /** Optional button slot (for Figma Code Connect) */
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export default function Keypad({
  onNumberPress,
  onDecimalPress,
  onBackspacePress,
  disableDecimal = false,
  actionBar = false,
  actionLabel = "Primary",
  actionDisabled = false,
  onActionPress,
  children,
  style,
  testID,
}: KeypadProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.keypadContainer}>
        {/* Row 1: 1, 2, 3 */}
        <View style={styles.row}>
          <KeypadButton value="1" onPress={() => onNumberPress?.("1")} />
          <KeypadButton value="2" onPress={() => onNumberPress?.("2")} />
          <KeypadButton value="3" onPress={() => onNumberPress?.("3")} />
        </View>

        {/* Row 2: 4, 5, 6 */}
        <View style={styles.row}>
          <KeypadButton value="4" onPress={() => onNumberPress?.("4")} />
          <KeypadButton value="5" onPress={() => onNumberPress?.("5")} />
          <KeypadButton value="6" onPress={() => onNumberPress?.("6")} />
        </View>

        {/* Row 3: 7, 8, 9 */}
        <View style={styles.row}>
          <KeypadButton value="7" onPress={() => onNumberPress?.("7")} />
          <KeypadButton value="8" onPress={() => onNumberPress?.("8")} />
          <KeypadButton value="9" onPress={() => onNumberPress?.("9")} />
        </View>

        {/* Row 4: ., 0, backspace */}
        <View style={styles.row}>
          <KeypadButton
            type="decimal"
            onPress={onDecimalPress}
            disabled={disableDecimal}
          />
          <KeypadButton value="0" onPress={() => onNumberPress?.("0")} />
          <KeypadButton type="icon" onPress={onBackspacePress} />
        </View>
      </View>

      {children ? (
        <ModalFooter modalVariant="default" primaryButton={children} />
      ) : actionBar ? (
        <ModalFooter
          modalVariant="default"
          primaryButton={
            <Button
              label={actionLabel}
              hierarchy="primary"
              size="md"
              disabled={actionDisabled}
              onPress={onActionPress}
            />
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    width: "100%",
  },
  keypadContainer: {
    paddingBottom: spacing["500"],
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
});
