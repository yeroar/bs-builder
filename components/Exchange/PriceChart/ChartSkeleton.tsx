import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colorPrimitives } from '../../tokens';
import { PADDING_LEFT } from './utils';

interface ChartSkeletonProps {
  width: number;
  height: number;
}

export const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ width, height }) => {
  const [points, setPoints] = useState<{ x: number, y: number }[]>([]);
  const revealAnim = useRef(new Animated.Value(0)).current;
  const blackAnim = useRef(new Animated.Value(0)).current;

  // Initialize a random walk path
  useEffect(() => {
    const numPoints = 80; // Slightly more points for a longer duration
    const pts = [];
    let currentY = height * 0.8; // Start lower
    const stepX = (width * 0.5) / (numPoints - 1);
    const targetY = height * 0.5;

    for (let i = 0; i < numPoints; i++) {
      pts.push({
        x: PADDING_LEFT + i * stepX,
        y: currentY,
      });
      
      // Increased volatility for more "scatter"
      const stepSize = 15;
      
      // Much gentler trend towards middle for a slower/longer looking climb
      const trend = (targetY - currentY) * 0.04;
      
      currentY += (Math.random() - 0.5) * stepSize + trend;
      
      // Keep within strict bounds
      currentY = Math.max(height * 0.2, Math.min(height * 0.8, currentY));
    }
    setPoints(pts);

    // Reveal animation
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    // Delayed black line animation
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(blackAnim, {
        toValue: 1,
        duration: 2500, // Slightly shorter to "catch up" or stay behind naturally
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [width, height]);

  const generatePath = () => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  const drawWidth = width;
  const revealWidth = revealAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.6], // Reveal slightly more than the 50% points to be safe
  });

  return (
    <Svg width={width} height={height} viewBox={`0 -10 ${width} ${height + 20}`}>
      {/* Animated Path (Background/Trail) */}
      <AnimatedPath
        d={generatePath()}
        stroke={colorPrimitives.yellow['400']}
        strokeWidth={2}
        fill="none"
        opacity={0.3} // Slightly dimmer trail
        strokeDasharray={`${width} ${width}`}
        strokeDashoffset={revealAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 0.6, 0]
        })}
      />

      {/* Delayed Black Line (Shine/Shadow) */}
      <AnimatedPath
        d={generatePath()}
        stroke="#000000"
        strokeWidth={2} // Matches yellow line
        fill="none"
        opacity={blackAnim.interpolate({
          inputRange: [0, 0.1, 0.9, 1],
          outputRange: [0, 1, 1, 0],
        })}
        strokeDasharray="60, 2000" // 60px segment
        strokeDashoffset={blackAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [60, -width * 0.5] // Correct range to move along the path
        })}
      />
    </Svg>
  );
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
