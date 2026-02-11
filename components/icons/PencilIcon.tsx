import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const PencilIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill={props.color || "#738496"}
        d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-13 13A1 1 0 0 1 8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707zM5 16.414V19h2.586l12-12L17 4.414z"
      />
    </Svg>
  );
};

export default PencilIcon;
