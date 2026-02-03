import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const ArrowNarrowLeftIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        d="M7.744 4.41a.833.833 0 1 1 1.178 1.18L5.345 9.166h11.322a.833.833 0 0 1 0 1.666H5.345l3.577 3.578.057.063a.833.833 0 0 1-1.171 1.172l-.064-.057-5-5a.833.833 0 0 1 0-1.178z"
      />
    </Svg>
  );
};

export default ArrowNarrowLeftIcon;
