import React from "react";
import Svg, {
  Path,
  Stop,
  LinearGradient,
  Defs,
  type SvgProps,
} from "react-native-svg";

interface IProps extends SvgProps {}

export const SkeuomorphicButtonBorder = (props: IProps) => {
  return (
    <Svg width="162" height="48" fill="none" viewBox="0 0 162 48" preserveAspectRatio="none" {...props}>
      <Path
        fill="url(#a)"
        d="M138 46v2H24v-2zm22-22c0-12.15-9.85-22-22-22H24C11.85 2 2 11.85 2 24s9.85 22 22 22v2l-.62-.008C10.413 47.664 0 37.048 0 24 0 10.745 10.745 0 24 0h114c13.255 0 24 10.745 24 24 0 13.048-10.412 23.664-23.381 23.992L138 48v-2c12.15 0 22-9.85 22-22"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1="81"
          x2="81"
          y1="0"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ffec9d" />
          <Stop offset="0.10" stopColor="#FFE466" />
          <Stop offset="0.20" stopColor="#FFDD33" />
          <Stop offset="0.20" stopColor="#E8BE11" />
          <Stop offset="0.30" stopColor="#d1a300" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SkeuomorphicButtonBorder;
