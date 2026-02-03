import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps { }

export const SwitchHorizontalIcon = (props: IProps) => {
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...props}>
      <Path
        fill={props.color || "#383323"}
        d="M6.077 10.244a.833.833 0 0 1 1.179 1.178l-1.911 1.911h11.322a.833.833 0 0 1 0 1.667H5.345l1.91 1.91.058.064a.833.833 0 0 1-1.172 1.172l-.064-.057-3.333-3.333a.833.833 0 0 1 0-1.178zm6.667-8.333a.833.833 0 0 1 1.115-.057l.063.057 3.334 3.333.057.064a.833.833 0 0 1-.057 1.115l-3.334 3.333a.833.833 0 1 1-1.178-1.179l1.91-1.91H3.335a.833.833 0 0 1 0-1.667h11.32l-1.91-1.91-.057-.064a.833.833 0 0 1 .057-1.115"
      />
    </Svg>
  );
};
export default SwitchHorizontalIcon;
