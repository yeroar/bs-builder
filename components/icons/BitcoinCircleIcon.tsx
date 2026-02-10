import React from "react";
import Svg, { G, Path, ClipPath, Defs, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const BitcoinCircleIcon = (props: IProps) => {
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={props.color || "#E56910"}
          fillRule="evenodd"
          d="M1.108 7.783a9.165 9.165 0 1 1 6.673 11.11 9.164 9.164 0 0 1-6.673-11.11M9.26 5.99a31 31 0 0 1-.6-.141v-.005L7.363 5.52l-.25 1.003s.698.16.683.17c.38.095.45.348.439.547l-.439 1.761q.04.01.098.031l-.1-.024-.614 2.465c-.047.115-.166.29-.432.223.01.014-.675-.168-.683-.17l-.467 1.076 1.223.305q.342.087.671.173l-.39 1.563.94.234.386-1.546q.385.105.75.194l-.385 1.54.94.234.39-1.56c1.604.304 2.81.181 3.318-1.27.409-1.167-.02-1.841-.865-2.28.615-.142 1.078-.547 1.201-1.381.17-1.14-.698-1.754-1.885-2.162l.386-1.545-.94-.235-.376 1.504a32 32 0 0 0-.754-.177l.377-1.514-.94-.235zm-.01 4.14c.638.159 2.683.474 2.38 1.692-.292 1.168-2.259.537-2.896.378zm.704-2.825c.531.132 2.241.38 1.965 1.487-.265 1.062-1.902.523-2.432.39z"
          clipRule="evenodd"
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

export default BitcoinCircleIcon;
