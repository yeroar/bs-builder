import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const UserIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <Path
        fill={color}
        d="M15.833 17.5c0-1.224-.008-1.65-.107-1.976a2.5 2.5 0 0 0-1.667-1.666c-.325-.1-.752-.108-1.976-.108H7.917c-1.224 0-1.651.009-1.976.107a2.5 2.5 0 0 0-1.667 1.667c-.098.325-.107.752-.107 1.976a.833.833 0 0 1-1.667 0c0-1.102-.01-1.838.18-2.46a4.17 4.17 0 0 1 2.777-2.777c.622-.189 1.358-.18 2.46-.18h4.166c1.103 0 1.838-.009 2.46.18a4.17 4.17 0 0 1 2.778 2.778c.188.621.18 1.357.18 2.46a.833.833 0 0 1-1.668 0M12.917 6.25a2.917 2.917 0 1 0-5.834 0 2.917 2.917 0 0 0 5.834 0m1.666 0a4.583 4.583 0 1 1-9.166 0 4.583 4.583 0 0 1 9.166 0"
      />
    </Svg>
  );
};

export default UserIcon;
