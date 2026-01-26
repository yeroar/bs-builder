import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

export const ChevronDownIcon = (props: SvgProps) => {
  const { color = colorMaps.face.tertiary, ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        d="M11.529 5.529a.667.667 0 1 1 .942.942l-4 4a.666.666 0 0 1-.942 0l-4-4a.667.667 0 1 1 .942-.942L8 9.057z"
      />
    </Svg>
  );
};

export default ChevronDownIcon;
