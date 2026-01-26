import Svg, { G, Path, SvgProps } from "react-native-svg"
import { colorMaps } from "../tokens/colorMaps"

const NavExchangeSolidIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <G fill={colorMaps.face.primary}>
      <Path d="M7.293 12.293a1 1 0 1 1 1.414 1.414L6.414 16H20a1 1 0 1 1 0 2H6.414l2.293 2.293a1 1 0 1 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414zM15.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L17.586 8H4a1 1 0 1 1 0-2h13.586l-2.293-2.293a1 1 0 0 1 0-1.414" />
    </G>
  </Svg>
)

export default NavExchangeSolidIcon
