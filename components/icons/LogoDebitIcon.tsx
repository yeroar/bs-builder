import Svg, {
  Path,
  Stop,
  LinearGradient,
  RadialGradient,
  Defs,
  type SvgProps,
} from "react-native-svg";

interface LogoDebitIconProps extends SvgProps {
  state?: "active" | "disabled";
}

const LogoDebitIcon = ({ state = "active", ...props }: LogoDebitIconProps) => {
  if (state === "disabled") {
    return (
      <Svg width={25} height={40} fill="none" viewBox="0 0 25 40" {...props}>
        <Path
          fill="#ECE7D8"
          fillOpacity={0.24}
          d="M8.81 31.902a.685.685 0 0 1 .925.64v6.772a.685.685 0 0 1-.925.64l-6.274-2.359c-1.521-.52-1.521-2.811 0-3.333zm9.633-16.776a.685.685 0 0 1 .927.64v7.288a3.555 3.555 0 0 1-2.331 3.334L.924 32.398a.685.685 0 0 1-.924-.64v-7.195a3.57 3.57 0 0 1 2.332-3.333zM23.294.044a.685.685 0 0 1 .924.64v7.409a3.66 3.66 0 0 1-2.4 3.421L.924 19.306A.685.685 0 0 1 0 18.665v-7.418a3.66 3.66 0 0 1 2.4-3.423z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={25} height={40} fill="none" viewBox="0 0 25 40" {...props}>
      <Path
        fill="url(#logoDebitFill)"
        stroke="url(#logoDebitStroke)"
        strokeWidth={0.227}
        d="M8.85 32.009a.57.57 0 0 1 .772.534v6.772c0 .398-.4.674-.772.534l-6.274-2.36h-.003l-.129-.051c-.62-.274-.935-.886-.935-1.508 0-.664.358-1.318 1.064-1.56h.003zm9.633-16.777a.57.57 0 0 1 .774.535v7.287A3.44 3.44 0 0 1 17 26.28h-.001L.884 32.293a.572.572 0 0 1-.77-.535v-7.194l.011-.263a3.44 3.44 0 0 1 2.246-2.964h.001zM23.334.15a.57.57 0 0 1 .77.535v7.408a3.55 3.55 0 0 1-2.325 3.314v.001L.883 19.2a.572.572 0 0 1-.77-.535v-7.418l.011-.27A3.55 3.55 0 0 1 2.439 7.93h.001z"
      />
      <Defs>
        <RadialGradient
          id="logoDebitStroke"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 19.9996 -12.1089 0 12.109 20)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E4C28B" />
          <Stop offset={1} stopColor="#B58E48" />
        </RadialGradient>
        <LinearGradient
          id="logoDebitFill"
          x1={10.976}
          x2={10.976}
          y1={-1.05}
          y2={38.949}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#A6803A" />
          <Stop offset={0.05} stopColor="#A6803A" />
          <Stop offset={0.08} stopColor="#B08A45" />
          <Stop offset={0.21} stopColor="#D2AC6A" />
          <Stop offset={0.32} stopColor="#EAC485" />
          <Stop offset={0.42} stopColor="#F9D395" />
          <Stop offset={0.5} stopColor="#FFD99B" />
          <Stop offset={0.6} stopColor="#FBD597" />
          <Stop offset={0.69} stopColor="#F1CC8D" />
          <Stop offset={0.76} stopColor="#E1BB7C" />
          <Stop offset={0.83} stopColor="#C9A464" />
          <Stop offset={0.9} stopColor="#AB8646" />
          <Stop offset={0.95} stopColor="#926D2C" />
          <Stop offset={1} stopColor="#926D2C" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default LogoDebitIcon;
