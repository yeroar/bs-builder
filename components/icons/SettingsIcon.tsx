import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const SettingsIcon = (props: IProps) => {
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...props}>
      <Path
        fill={props.color || "#383323"}
        d="M5 10a3.335 3.335 0 0 1 3.228 2.5H17.5a.833.833 0 0 1 .085 1.663l-.085.004H8.228a3.335 3.335 0 0 1-6.561-.834A3.333 3.333 0 0 1 5 10m11.667-3.333a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0M3.333 13.333a1.667 1.667 0 1 0 3.334 0 1.667 1.667 0 0 0-3.334 0m15-6.666a3.333 3.333 0 0 1-6.561.833H2.5a.833.833 0 1 1 0-1.667h9.272a3.335 3.335 0 0 1 6.561.834"
      />
    </Svg>
  );
};

export default SettingsIcon;
