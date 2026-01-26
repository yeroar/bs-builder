import React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ChevronLeftIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="#383323"
        d="M14.293 5.293a1 1 0 1 1 1.414 1.414L10.414 12l5.293 5.293.068.076a1 1 0 0 1-1.406 1.406l-.076-.068-6-6a1 1 0 0 1 0-1.414z"
      />
    </Svg>
  );
};

export default ChevronLeftIcon;
