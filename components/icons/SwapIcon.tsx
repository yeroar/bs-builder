import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

export const SwapIcon = (props: SvgProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        d="M4 13.333V4.276L2.471 5.805a.667.667 0 1 1-.942-.943l2.666-2.667.051-.045a.666.666 0 0 1 .892.045l2.667 2.667.045.05a.666.666 0 0 1-.937.938l-.05-.045-1.53-1.529v9.057a.667.667 0 1 1-1.333 0m6.667-10.666a.667.667 0 0 1 1.333 0v9.057l1.529-1.529a.667.667 0 1 1 .943.943l-2.667 2.667a.667.667 0 0 1-.943 0l-2.667-2.667-.045-.05a.666.666 0 0 1 .937-.938l.051.045 1.529 1.529z"
      />
    </Svg>
  );
};

export default SwapIcon;
