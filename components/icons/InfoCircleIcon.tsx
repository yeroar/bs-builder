import React from "react";
import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

export const InfoCircleIcon = (props: SvgProps) => {
  const { color = colorMaps.face.tertiary, ...rest } = props;
  return (
    <Svg width="12" height="12" fill="none" viewBox="0 0 12 12" {...rest}>
      <G clipPath="url(#a)">
        <Path
          fill={color}
          d="M10.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0m-5 2V6a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0m.505-4.5a.5.5 0 1 1 0 1H6a.5.5 0 0 1 0-1zM11.5 6a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h12v12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default InfoCircleIcon;
