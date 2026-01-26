import React from "react";
import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const CheckCircleIcon = (props: IProps) => {
  const { color = "#383323", ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <G clipPath="url(#toast-check-clip)">
        <Path
          fill={color}
          d="M14 8A6 6 0 1 0 2 8a6 6 0 0 0 12 0M10.53 5.529a.667.667 0 1 1 .942.942l-4 4a.666.666 0 0 1-.942 0l-2-2-.046-.05a.666.666 0 0 1 .938-.938l.05.046 1.53 1.528zM15.333 8A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0"
        />
      </G>
      <Defs>
        <ClipPath id="toast-check-clip">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CheckCircleIcon;
