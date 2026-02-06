import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const PlusIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        d="M9.167 15.833v-5h-5a.833.833 0 0 1 0-1.666h5v-5a.833.833 0 1 1 1.666 0v5h5a.833.833 0 0 1 0 1.666h-5v5a.833.833 0 0 1-1.666 0"
      />
    </Svg>
  );
};

export default PlusIcon;
