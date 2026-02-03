import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowNarrowUpIcon = (props: IProps) => {
  const { color = "#383323", ...rest } = props;
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...rest}>
      <Path
        fill={color}
        d="M12 3a1 1 0 0 1 .707.293l5 5a1 1 0 0 1-1.414 1.414L13 6.414V20a1 1 0 1 1-2 0V6.414L7.707 9.707a1 1 0 0 1-1.414-1.414l5-5A1 1 0 0 1 12 3Z"
      />
    </Svg>
  );
};

export default ArrowNarrowUpIcon;
