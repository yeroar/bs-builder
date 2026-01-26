import React from "react";
import Svg, { Circle, type SvgProps } from "react-native-svg";

export const CircleIcon = (props: SvgProps) => {
  const { color = "#383323", ...rest } = props;
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...rest}>
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="2"
      />
    </Svg>
  );
};

export default CircleIcon;
