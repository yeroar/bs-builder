import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { colorMaps } from "../tokens/colorMaps";

export interface SunIconProps extends SvgProps {
  /** When true, the icon spins continuously */
  spinning?: boolean;
  /** Spin duration in ms (one full rotation) */
  spinSpeed?: number;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SunIcon = ({ spinning = false, spinSpeed = 800, ...props }: SunIconProps) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinning) {
      rotation.setValue(0);
      const loop = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: spinSpeed,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loop.start();
      return () => loop.stop();
    } else {
      rotation.setValue(0);
    }
  }, [spinning]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const SvgComponent = spinning ? AnimatedSvg : Svg;

  return (
    <SvgComponent
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      {...(spinning ? { style: [props.style, { transform: [{ rotate }] }] } : {})}
    >
      <Path
        fill={props.color || colorMaps.face.primary}
        d="M11 22v-4a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0m-3.957-6.457a1 1 0 1 1 1.414 1.414l-2.828 2.828a1 1 0 1 1-1.414-1.414zm8.5 0a1 1 0 0 1 1.338-.068l.076.068 2.828 2.828a1 1 0 1 1-1.414 1.414l-2.828-2.828-.068-.076a1 1 0 0 1 .068-1.338M6 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2zm16 0a1 1 0 1 1 0 2h-4a1 1 0 1 1 0-2zM4.215 4.293a1 1 0 0 1 1.338-.068l.076.068 2.828 2.828a1 1 0 0 1-1.338 1.483l-.076-.069-2.828-2.828-.07-.076a1 1 0 0 1 .07-1.338m14.156 0a1 1 0 0 1 1.414 1.414l-2.828 2.828a1 1 0 1 1-1.414-1.414zM11 6V2a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0"
      />
    </SvgComponent>
  );
};

export default SunIcon;
