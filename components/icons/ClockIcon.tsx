import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const ClockIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 16 16" {...rest}>
      <G clipPath="url(#clock-clip)">
        <Path
          fill={color}
          d="M14 8A6 6 0 1 0 2 8a6 6 0 0 0 12 0M7.333 4a.667.667 0 0 1 1.334 0v3.588l2.298 1.149.06.034a.667.667 0 0 1-.594 1.186l-.062-.027-2.667-1.334A.67.67 0 0 1 7.333 8zm8 4A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0"
        />
      </G>
      <Defs>
        <ClipPath id="clock-clip">
          <Path fill="#fff" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ClockIcon;
