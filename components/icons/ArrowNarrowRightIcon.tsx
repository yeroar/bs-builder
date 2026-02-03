import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const ArrowNarrowRightIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        d="M11.078 4.41a.833.833 0 0 1 1.178 0l5 5a.833.833 0 0 1 0 1.18l-5 5a.833.833 0 0 1-1.178-1.18l3.577-3.577H3.333a.833.833 0 0 1 0-1.666h11.322l-3.577-3.578-.057-.063a.833.833 0 0 1 .056-1.115"
      />
    </Svg>
  );
};

export default ArrowNarrowRightIcon;
