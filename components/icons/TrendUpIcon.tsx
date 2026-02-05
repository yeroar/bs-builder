import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const TrendUpIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        d="M11.667 5a.833.833 0 0 1 .833-.833h4.167a.833.833 0 0 1 .833.833v4.167a.833.833 0 0 1-1.667 0V6.012l-5.244 5.244a.833.833 0 0 1-1.178 0L7.5 9.345l-4.911 4.91a.833.833 0 1 1-1.178-1.177l5.5-5.5a.833.833 0 0 1 1.178 0L10 9.488l4.488-4.488h-2.821a.833.833 0 0 1 0-1.667h4.166Z"
      />
    </Svg>
  );
};

export default TrendUpIcon;
