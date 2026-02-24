import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const SparkleIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        d="M8 0a.5.5 0 0 1 .5.5v2.035a5 5 0 0 1 4.465 4.465H15a.5.5 0 0 1 0 1h-2.035A5 5 0 0 1 8.5 12.465V15a.5.5 0 0 1-1 0v-2.535A5 5 0 0 1 3.035 8H1a.5.5 0 0 1 0-1h2.035A5 5 0 0 1 7.5 2.535V.5A.5.5 0 0 1 8 0m0 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
      />
    </Svg>
  );
};

export default SparkleIcon;
