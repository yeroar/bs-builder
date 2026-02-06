import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

export const CameraIcon = (props: SvgProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.724 2.667a1 1 0 0 0-.858.486L4.2 4.117a.333.333 0 0 1-.286.163H2.667a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10.666a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1.247a.333.333 0 0 1-.286-.163l-.666-.964a1 1 0 0 0-.858-.486H5.724ZM8 10.667a2.333 2.333 0 1 0 0-4.667 2.333 2.333 0 0 0 0 4.667Z"
      />
    </Svg>
  );
};

export default CameraIcon;
