import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ClockIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="#383323"
        d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm0 18a8 8 0 118-8 8.01 8.01 0 01-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
      />
    </Svg>
  );
};

export default ClockIcon;
