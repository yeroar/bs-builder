import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export const AlertHexagonIcon = (props: SvgProps) => {
  const { color = "#D22619", ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.134 1.5a1 1 0 0 1 .866-.5h.001a1 1 0 0 1 .865.5l5.732 9.928a1 1 0 0 1-.866 1.5H2.268a1 1 0 0 1-.866-1.5zm.866.934L2.768 11.5h10.464zM8 5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 5m0 4.5a.5.5 0 1 0 0 1h.005a.5.5 0 1 0 0-1z"
      />
    </Svg>
  );
};

export default AlertHexagonIcon;
