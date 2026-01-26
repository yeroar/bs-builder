import React from "react";
import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const AlertCircleIcon = (props: IProps) => {
  const { color = "#383323", ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <G clipPath="url(#toast-alert-clip)">
        <Path
          fill={color}
          d="M8 .667a7.334 7.334 0 1 1 0 14.667A7.334 7.334 0 0 1 8 .667M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2m.075 8.004a.668.668 0 0 1 0 1.326l-.068.004H8A.667.667 0 0 1 8 10h.007zM8 4.668c.368 0 .667.298.667.666V8a.668.668 0 0 1-1.333 0V5.334c0-.368.298-.666.666-.666"
        />
      </G>
      <Defs>
        <ClipPath id="toast-alert-clip">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AlertCircleIcon;
