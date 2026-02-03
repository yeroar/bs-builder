import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const SearchMdIcon = (props: IProps) => {
  const { color = colorMaps.face.tertiary, ...rest } = props;
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...rest}>
      <Path
        fill={color}
        d="M12 7.333a4.667 4.667 0 1 0-1.424 3.355.7.7 0 0 1 .112-.112A4.65 4.65 0 0 0 12 7.333m1.333 0a5.97 5.97 0 0 1-1.313 3.745l2.451 2.45.046.051a.666.666 0 0 1-.937.938l-.051-.046-2.451-2.45a6 6 0 1 1 2.256-4.687"
      />
    </Svg>
  );
};

export default SearchMdIcon;
