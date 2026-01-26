import React, { ReactNode } from "react";
import { TouchableOpacity, StyleProp, ViewStyle, View } from "react-native";

type FoldPressableProps = {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
};

const FoldPressable: React.FC<FoldPressableProps> = ({
  children,
  onPress,
  style,
  activeOpacity = 0.7,
  hitSlop,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
    >
      {children}
    </TouchableOpacity>
  );
};

export default FoldPressable;
