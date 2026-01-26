import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FoldPressable from "../Primitives/FoldPressable";
import { spacing } from "../tokens";

type StackControlProps = {
  variant: "left" | "right";
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const StackControl: React.FC<StackControlProps> = ({
  variant,
  leadingSlot,
  trailingSlot,
  children,
  style,
  onLeftPress,
  onRightPress,
}) => {
  const navigation = useNavigation();
  const showLeading = !!leadingSlot;
  const showTrailing = !!trailingSlot;

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    }
  };

  return (
    <View
      style={[
        styles.base,
        variant === "left" ? styles.left : styles.right,
    style,
  ]}
>
  {showLeading && (
        <FoldPressable
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={variant === "left" ? handleLeftPress : handleRightPress}
        >
          {leadingSlot}
        </FoldPressable>
      )}
      {showTrailing && (
        <FoldPressable
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={variant === "right" ? handleRightPress : handleLeftPress}
        >
          {trailingSlot}
        </FoldPressable>
      )}
      {!showLeading && !showTrailing ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["400"],
  },
  left: {
    justifyContent: "flex-start",

  },
  right: {
    justifyContent: "flex-end",

  },
});

export default StackControl;
