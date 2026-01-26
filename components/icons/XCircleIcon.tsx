import React from "react";
import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const XCircleIcon = (props: IProps) => {
  const { color = "#C7281B", ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <G clipPath="url(#x-circle-clip)">
        <Path
          fill={color}
          d="M14 8A6 6 0 1 0 2 8a6 6 0 0 0 12 0M9.53 5.53a.666.666 0 1 1 .942.942l-1.528 1.53 1.528 1.528.046.05a.666.666 0 0 1-.937.938l-.051-.046L8 8.943 6.471 10.47a.666.666 0 1 1-.942-.942L7.057 8 5.53 6.471l-.046-.05a.666.666 0 0 1 .938-.938l.05.046 1.53 1.528zM15.333 8A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0"
        />
      </G>
      <Defs>
        <ClipPath id="x-circle-clip">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default XCircleIcon;
