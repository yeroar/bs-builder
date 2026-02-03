import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

export const XCloseIcon = (props: SvgProps) => {
  const { color = "#383323", ...rest } = props;
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...rest}>
      <Path
        fill={color}
        d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068L9 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L7.586 12 2.293 6.707a1 1 0 1 1 1.414-1.414L9 10.586z"
      />
    </Svg>
  );
};

export default XCloseIcon;
