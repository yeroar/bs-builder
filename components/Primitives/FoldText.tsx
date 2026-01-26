import React, { ReactNode } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { typographyStyles, colorMaps, FoldTextType } from "../tokens";

type FoldTextProps = {
  children?: ReactNode;
  type?: FoldTextType | string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
};

export const FoldText: React.FC<FoldTextProps> = ({
  children,
  type = "body-md",
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  const baseStyle = typographyStyles[type] || typographyStyles["body-md"];
  
  return (
    <Text
      style={[
        { color: colorMaps.face.primary },
        baseStyle,
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default FoldText;
