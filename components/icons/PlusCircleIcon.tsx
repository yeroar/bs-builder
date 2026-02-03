import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps { }

export const PlusCircleIcon = (props: IProps) => {
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill={props.color || "#0066FF"}
          d="M14 8A6 6 0 1 0 2 8a6 6 0 0 0 12 0m-6.666 2.667v-2h-2a.667.667 0 0 1 0-1.334h2v-2a.667.667 0 0 1 1.333 0v2h2a.667.667 0 1 1 0 1.334h-2v2a.667.667 0 1 1-1.333 0m8-2.667A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.667 0"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PlusCircleIcon;
