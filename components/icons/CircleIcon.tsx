import React from "react";
import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {
  color?: string;
}

export const CircleIcon = (props: IProps) => {
  const { color = colorMaps.face.disabled, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M17.5 10a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0m1.667 0A9.167 9.167 0 1 1 .833 10a9.167 9.167 0 0 1 18.334 0"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CircleIcon;
