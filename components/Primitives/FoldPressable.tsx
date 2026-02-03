import React, { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle, PressableStateCallbackType } from "react-native";

type FoldPressableProps = {
  children?: ReactNode | ((state: { pressed: boolean }) => ReactNode);
  onPress?: () => void;
  style?: StyleProp<ViewStyle> | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
};

const FoldPressable: React.FC<FoldPressableProps> = ({
  children,
  onPress,
  style,
  disabled,
  hitSlop,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={style}
      disabled={disabled}
      hitSlop={hitSlop}
    >
      {typeof children === "function" ? children : children}
    </Pressable>
  );
};

export default FoldPressable;
