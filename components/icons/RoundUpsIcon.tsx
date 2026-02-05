import Svg, { Path, G, ClipPath, Defs, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const RoundUpsIcon = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="20" height="20" fill="none" viewBox="0 0 20 20" {...rest}>
      <G clipPath="url(#roundups-clip)">
        <Path
          fill={color}
          d="M10.834 13.333a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0m6.666 0a.833.833 0 0 1 1.667 0c0 2.19-1.69 3.984-3.836 4.152l.258.26.057.063a.833.833 0 0 1-1.172 1.172l-.063-.058-1.667-1.666a.833.833 0 0 1 0-1.178l1.667-1.667a.833.833 0 0 1 1.178 1.178l-.217.217a2.5 2.5 0 0 0 2.128-2.473m0-6.666a4.167 4.167 0 0 0-8.202-1.043L7.684 5.21a5.833 5.833 0 1 1 7.107 7.107.834.834 0 1 1-.415-1.614A4.17 4.17 0 0 0 17.5 6.667m-16.667 0c0-2.19 1.69-3.984 3.836-4.153l-.258-.258-.057-.064a.833.833 0 0 1 1.235-1.115l1.667 1.667a.833.833 0 0 1 0 1.179L5.589 5.589a.833.833 0 1 1-1.178-1.178l.216-.217A2.5 2.5 0 0 0 2.5 6.667a.833.833 0 0 1-1.667 0m8.465-1.043a.834.834 0 0 1-1.614-.415zm3.202 7.71a5.833 5.833 0 1 1-11.666 0 5.833 5.833 0 0 1 11.666 0"
        />
      </G>
      <Defs>
        <ClipPath id="roundups-clip">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default RoundUpsIcon;
