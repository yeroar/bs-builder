import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

export const CopyIcon = (props: SvgProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...rest}>
      <Path
        fill={color}
        d="M7 4a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-7Z"
      />
      <Path
        fill={color}
        d="M4 8a3 3 0 0 1 1-2.236V14a4 4 0 0 0 4 4h6.236A3 3 0 0 1 13 19H9a5 5 0 0 1-5-5V8Z"
      />
    </Svg>
  );
};

export default CopyIcon;
