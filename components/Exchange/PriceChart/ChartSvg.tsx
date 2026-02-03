import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Animated } from 'react-native';
import Svg, { Rect, Circle, Line, Path, Defs, Pattern, ClipPath, LinearGradient, RadialGradient, Stop, Mask, G } from 'react-native-svg';
import { colorPrimitives } from '../../tokens';
import { DataPoint, TimeRange, Point } from './types';
import { DOT_SPACING, generateSmoothPath, generateSmoothAreaPath } from './utils';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

interface ChartSvgProps {
  containerWidth: number;
  containerHeight: number;
  data: DataPoint[];
  timeRange: TimeRange;
  paddingLeft: number;
  paddingRight: number;
  drawWidth: number;
  crosshairX: number | null;
  selectedIndex: number | null;
  chartGeometry: {
    linePath: string;
    areaPath: string;
    smoothLinePath?: string;
    smoothAreaPath?: string;
    points: Point[];
    resampledSmoothPts: Point[];
  };
  previousChartGeometry: {
    points: Point[];
    resampledSmoothPts: Point[];
  };
  pulseAnim: Animated.Value;
  isInteracting?: boolean;
}

export interface ChartSvgHandle {
  setNativeInteraction: (index: number | null, interacting: boolean) => void;
}

const ChartSvgComponent = forwardRef<ChartSvgHandle, ChartSvgProps>((props, ref) => {
  const {
    containerWidth,
    containerHeight,
    data,
    timeRange,
    paddingLeft,
    paddingRight,
    drawWidth,
    crosshairX,
    selectedIndex,
    chartGeometry,
    previousChartGeometry,
    pulseAnim,
    isInteracting: propIsInteracting,
  } = props;

  const { points, resampledSmoothPts } = chartGeometry;
  const prevPoints = previousChartGeometry.points;
  const prevResampled = previousChartGeometry.resampledSmoothPts;

  // Refs for direct SVG manipulation
  const lineRef = useRef<any>(null);
  const areaRef = useRef<any>(null);
  const maskAreaRef = useRef<any>(null);
  const redLineRef = useRef<any>(null);
  const pulseCircleRef = useRef<any>(null);
  const mainCircleRef = useRef<any>(null);
  const vLineRef = useRef<any>(null);
  const hLineRef = useRef<any>(null);
  const redClipRectRef = useRef<any>(null);

  // High-frequency interaction tracking (internal to avoid re-renders)
  const isInteractingRef = useRef(propIsInteracting || false);
  const selectedIndexRef = useRef(selectedIndex);

  // Sync prop changes to internal refs (for tap start/end)
  useEffect(() => {
    isInteractingRef.current = propIsInteracting || false;
    selectedIndexRef.current = selectedIndex;
  }, [propIsInteracting, selectedIndex]);

  // Animated path transition (0 = smooth, 1 = detailed)
  const pathTransition = useRef(new Animated.Value(0)).current;
  // Animated range transition (0 = previous chart, 1 = current chart)
  const rangeTransition = useRef(new Animated.Value(1)).current;
  // Refs to track current animation values (since useNativeDriver doesn't sync _value)
  const pathValueRef = useRef(isInteractingRef.current ? 1 : 0);
  const rangeValueRef = useRef(1);

  // Ref to track latest values for the animation listener to avoid stale closure
  const animationStateRef = useRef({
    points,
    resampledSmoothPts,
    prevPoints,
    prevResampled,
    containerHeight,
  });

  // Synchronously update the ref for high-frequency path updates
  animationStateRef.current = {
    points,
    resampledSmoothPts,
    prevPoints,
    prevResampled,
    containerHeight,
  };

  // Animated index for organic scrubber movement
  const initialIdx = points.length - 1;
  const visualIndexAnim = useRef(new Animated.Value(initialIdx)).current;
  const visualIndexRef = useRef(initialIdx);

  // Helper for direct path updates
  const updatePaths = () => {
    if (!lineRef.current || !areaRef.current) return;
    const tInteraction = pathValueRef.current;
    const tRange = rangeValueRef.current;
    const vIdx = visualIndexRef.current;

    const {
      points: currentPts,
      containerHeight: height
    } = animationStateRef.current;

    // Helper to get a morphed point for a specific index
    const getMorphedPoint = (idx: number, state: any, tInt: number, tRng: number) => {
      const pDetailed = state.points[idx];
      const pSmooth = state.resampledSmoothPts[idx];
      if (!pDetailed || !pSmooth) return null;

      const currentTargetX = pSmooth.x + (pDetailed.x - pSmooth.x) * tInt;
      const currentTargetY = pSmooth.y + (pDetailed.y - pSmooth.y) * tInt;

      const pPrevDetailed = state.prevPoints[idx] || pDetailed;
      const pPrevSmooth = state.prevResampled[idx] || pSmooth;

      // Smoother "organic" transition: Interpolate X as well
      const prevX = pPrevSmooth.x + (pPrevDetailed.x - pPrevSmooth.x) * tInt;
      const targetX = prevX + (currentTargetX - prevX) * tRng;
      const prevTargetY = pPrevSmooth.y + (pPrevDetailed.y - pPrevSmooth.y) * tInt;

      return {
        x: targetX,
        y: prevTargetY + (currentTargetY - prevTargetY) * tRng,
      };
    };

    // Helper to apply the same 3-point smoothing filter used by the line path
    const getVisualPoint = (pts: (Point | null)[], idx: number) => {
      const p = pts[idx];
      if (!p) return { x: 0, y: 0 };
      if (idx === 0 || idx === pts.length - 1) return p;
      if (!pts[idx - 1] || !pts[idx + 1]) return p;

      return {
        x: p.x,
        y: (pts[idx - 1]!.y + p.y * 2 + pts[idx + 1]!.y) / 4,
      };
    };

    const morphedPts = currentPts.map((_, i) => getMorphedPoint(i, animationStateRef.current, tInteraction, tRange));

    const newLinePath = generateSmoothPath(morphedPts as any, height);
    const newAreaPath = generateSmoothAreaPath(morphedPts as any, height, newLinePath);

    lineRef.current.setNativeProps({ d: newLinePath });
    if (redLineRef.current) redLineRef.current.setNativeProps({ d: newLinePath });
    areaRef.current.setNativeProps({ d: newAreaPath });
    if (maskAreaRef.current) maskAreaRef.current.setNativeProps({ d: newAreaPath });

    // Calculate organic scrubber position by interpolating between discrete points
    const iLow = Math.floor(vIdx);
    const iHigh = Math.min(iLow + 1, morphedPts.length - 1);
    const weight = vIdx - iLow;

    const pLow = getVisualPoint(morphedPts, iLow);
    const pHigh = getVisualPoint(morphedPts, iHigh);

    const x = pLow.x + (pHigh.x - pLow.x) * weight;
    const y = pLow.y + (pHigh.y - pLow.y) * weight;

    // Update dynamic clip for the red line
    if (redClipRectRef.current) {
      redClipRectRef.current.setNativeProps({
        x: x,
        width: Math.max(0, containerWidth - x)
      });
    }

    if (pulseCircleRef.current) pulseCircleRef.current.setNativeProps({ cx: x, cy: y });
    if (mainCircleRef.current) mainCircleRef.current.setNativeProps({ cx: x, cy: y });
    if (vLineRef.current) vLineRef.current.setNativeProps({ x1: x, x2: x, opacity: selectedIndexRef.current !== null ? 1 : 0 });
    if (hLineRef.current) hLineRef.current.setNativeProps({ y1: y, y2: y, opacity: selectedIndexRef.current !== null ? 1 : 0 });
  };

  // Expose methods for re-render free interaction
  useImperativeHandle(ref, () => ({
    setNativeInteraction: (index: number | null, interacting: boolean) => {
      const changedInteracting = interacting !== isInteractingRef.current;
      isInteractingRef.current = interacting;
      selectedIndexRef.current = index;

      // Handle interaction spring start
      if (changedInteracting) {
        pathTransition.stopAnimation();
        Animated.spring(pathTransition, {
          toValue: interacting ? 1 : 0,
          tension: 7,
          friction: 10,
          useNativeDriver: true,
        }).start();

        if (interacting && index !== null) {
          Animated.spring(visualIndexAnim, {
            toValue: index,
            tension: 7,
            friction: 12,
            useNativeDriver: true,
          }).start();
        }
      }

      // High-speed scrubbing update
      if (interacting && index !== null && !changedInteracting) {
        visualIndexAnim.setValue(index);
      } else if (!interacting) {
        visualIndexAnim.setValue(points.length - 1);
      }

      updatePaths();
    }
  }));

  // Setup listeners and sync initial paths
  useEffect(() => {
    const pathValueRefCurrent = pathValueRef;
    const rangeValueRefCurrent = rangeValueRef;
    const visualIndexRefCurrent = visualIndexRef;

    const pathSub = pathTransition.addListener(({ value }) => {
      pathValueRefCurrent.current = value;
      updatePaths();
    });
    const rangeSub = rangeTransition.addListener(({ value }) => {
      rangeValueRefCurrent.current = value;
      updatePaths();
    });
    const vIdxSub = visualIndexAnim.addListener(({ value }) => {
      visualIndexRefCurrent.current = value;
      updatePaths();
    });

    // Sync immediately on mount
    updatePaths();

    return () => {
      pathTransition.removeListener(pathSub);
      rangeTransition.removeListener(rangeSub);
      visualIndexAnim.removeListener(vIdxSub);
    };
  }, []);

  // Force sync on geometry changes
  useEffect(() => {
    updatePaths();
  }, [chartGeometry]);

  // Track data length to detect actual time range changes
  const prevDataLengthRef = useRef(points.length);

  // Trigger Range Transition Morph (detect by data length change OR actual geometry points change)
  useEffect(() => {
    // We always reset transition to 0 and spring to 1 when geometry changes
    // This handles period changes smoothly
    rangeTransition.setValue(0);
    Animated.spring(rangeTransition, {
      toValue: 1,
      tension: 20, // Softer, more organic
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, [points]);

  // Sync initial path state if prop changes
  useEffect(() => {
    pathTransition.stopAnimation();
    Animated.spring(pathTransition, {
      toValue: propIsInteracting ? 1 : 0,
      tension: 7,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [propIsInteracting]);

  // Static scale values to ensure full width (No Bloom)
  const scaleX = 1.0;
  const scaleY = 1.0;

  const strokeColor = colorPrimitives.gray['1000'];
  const activeStrokeColor = colorPrimitives.gray['1000'];
  const fillColor = colorPrimitives.yellow['300'];

  return (
    <Svg
      width={containerWidth}
      height={containerHeight}
      viewBox={`0 -20 ${containerWidth} ${containerHeight + 40}`}
      preserveAspectRatio="none"
      pointerEvents="none"
    >
      <Defs>
        <Pattern
          id="dotPattern"
          x="0"
          y="0"
          width={DOT_SPACING}
          height={DOT_SPACING}
          patternUnits="userSpaceOnUse"
        >
          <Circle cx="1" cy="1" r="1" fill={colorPrimitives.gray['1000']} opacity={0.6} />
        </Pattern>

        <LinearGradient id="dotMaskGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0.1" stopColor="white" stopOpacity="0.3" />
          <Stop offset="0.5" stopColor="white" stopOpacity="0.6" />
          <Stop offset="1" stopColor="white" stopOpacity="1" />
        </LinearGradient>

        <Mask id="dotMask">
          {/* Base visibility gradient */}
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#dotMaskGrad)" />
          {/* Punch a hole where the chart area exists */}
          <Path
            ref={maskAreaRef}
            d={chartGeometry.smoothAreaPath}
            fill="black"
          />
        </Mask>

        {/* Quadrant Radial Gradients focused on the crosshair */}
        {crosshairX !== null && selectedIndex !== null && points[selectedIndex] && (
          <>
            <RadialGradient
              id="quadGrad1"
              cx={crosshairX}
              cy={points[selectedIndex].y}
              rx={containerWidth * 1.5}
              ry={containerHeight * 1.5}
              fx={crosshairX}
              fy={points[selectedIndex].y}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
              <Stop offset="0.5" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
              <Stop offset="1" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
            </RadialGradient>

            <RadialGradient
              id="quadGrad2"
              cx={crosshairX}
              cy={0}
              rx={containerWidth * 1.5}
              ry={containerHeight * 1.5}
              fx={crosshairX}
              fy={0}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
              <Stop offset="0.7" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
              <Stop offset="1" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
            </RadialGradient>

            <RadialGradient
              id="quadGrad3"
              cx={crosshairX}
              cy={points[selectedIndex].y}
              rx={containerWidth * 1.5}
              ry={containerHeight * 1.5}
              fx={crosshairX}
              fy={points[selectedIndex].y}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
              <Stop offset="0.7" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
              <Stop offset="1" stopColor={colorPrimitives.yellow['300']} stopOpacity="1" />
            </RadialGradient>

            <RadialGradient
              id="quadGrad4"
              cx={crosshairX}
              cy={containerHeight}
              rx={containerWidth * 1.5}
              ry={containerHeight * 1.5}
              fx={crosshairX}
              fy={containerHeight}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
              <Stop offset="0.7" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
              <Stop offset="1" stopColor={colorPrimitives.yellow['300']} stopOpacity="0" />
            </RadialGradient>
          </>
        )}

        <ClipPath id="redClip">
          <Rect
            ref={redClipRectRef}
            x={containerWidth}
            y={-100}
            width={0}
            height={containerHeight + 200}
          />
        </ClipPath>
      </Defs>

      <AnimatedG
        scaleX={scaleX}
        scaleY={scaleY}
        originX={containerWidth / 2}
        originY={containerHeight / 2}
      >
        <Rect
          x={paddingLeft}
          width={drawWidth}
          height={containerHeight}
          fill="url(#dotPattern)"
          mask="url(#dotMask)"
        />

        {crosshairX !== null && selectedIndex !== null && points[selectedIndex] && (
          <>
            <Rect x={paddingLeft} y={0} width={crosshairX - paddingLeft} height={points[selectedIndex].y} fill="url(#quadGrad1)" />
            <Rect x={crosshairX} y={0} width={containerWidth - paddingRight - crosshairX} height={points[selectedIndex].y} fill="url(#quadGrad2)" />
            <Rect x={crosshairX} y={points[selectedIndex].y} width={containerWidth - paddingRight - crosshairX} height={containerHeight - points[selectedIndex].y} fill="url(#quadGrad3)" />
            <Rect x={paddingLeft} y={points[selectedIndex].y} width={crosshairX - paddingLeft} height={containerHeight - points[selectedIndex].y} fill="url(#quadGrad4)" />
          </>
        )}

        {/* Simplifed Single Chart Layer to prevent blinking */}
        <AnimatedPath
          ref={areaRef}
          d={chartGeometry.smoothAreaPath}
          fill={fillColor}
          opacity={0.3}
        />

        {/* Base line (Black) */}
        <AnimatedPath
          ref={lineRef}
          d={chartGeometry.smoothLinePath}
          stroke={colorPrimitives.gray['1000']}
          strokeWidth={2}
          fill="none"
        />

        {/* Clipped line (Red) */}
        <AnimatedPath
          ref={redLineRef}
          d={chartGeometry.smoothLinePath}
          stroke={colorPrimitives.yellow['600']}
          strokeWidth={2}
          fill="none"
          clipPath="url(#redClip)"
        />

        {(() => {
          const isDefaultEnd = selectedIndex === null && timeRange === '24H';
          const index = selectedIndex !== null ? selectedIndex : (isDefaultEnd ? data.length - 1 : null);

          if (index !== null && points[index] && resampledSmoothPts[index]) {
            const initialPos = (() => {
              // Calculate morphed neighbors to apply the same 3-point smoothing
              const tInt = pathValueRef.current;
              const tRng = rangeValueRef.current;
              const state = animationStateRef.current;

              // Helper exactly as in updatePaths (localized to closure for safety)
              const getLocalMorphed = (idx: number) => {
                const pDetailed = state.points[idx];
                const pSmooth = state.resampledSmoothPts[idx];
                if (!pDetailed || !pSmooth) return null;
                const cTargetX = pSmooth.x + (pDetailed.x - pSmooth.x) * tInt;
                const cTargetY = pSmooth.y + (pDetailed.y - pSmooth.y) * tInt;
                const pPrevDet = state.prevPoints[idx] || pDetailed;
                const pPrevSm = state.prevResampled[idx] || pSmooth;
                const prevX = pPrevSm.x + (pPrevDet.x - pPrevSm.x) * tInt;
                const targetX = prevX + (cTargetX - prevX) * tRng;
                const prevTargetY = pPrevSm.y + (pPrevDet.y - pPrevSm.y) * tInt;
                return { x: targetX, y: prevTargetY + (cTargetY - prevTargetY) * tRng };
              };

              const p = getLocalMorphed(index);
              if (!p) return { x: 0, y: 0 };
              if (index === 0 || index === (state.points.length - 1)) return p;

              const pPrev = getLocalMorphed(index - 1);
              const pNext = getLocalMorphed(index + 1);
              if (!pPrev || !pNext) return p;

              return {
                x: p.x,
                y: (pPrev.y + p.y * 2 + pNext.y) / 4
              };
            })();

            return (
              <>
                {isDefaultEnd ? (
                  <>
                    <AnimatedCircle
                      ref={pulseCircleRef}
                      cx={initialPos.x}
                      cy={initialPos.y}
                      r={pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [6, 10] })}
                      fill={colorPrimitives.gray['1000']}
                      opacity={pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] })}
                    />
                    <AnimatedCircle
                      ref={mainCircleRef}
                      cx={initialPos.x}
                      cy={initialPos.y}
                      r={6}
                      fill={colorPrimitives.gray['1000']}
                      stroke={colorPrimitives.yellow['300']}
                      strokeWidth={2}
                    />
                  </>
                ) : (
                  <AnimatedCircle
                    ref={mainCircleRef}
                    cx={initialPos.x}
                    cy={initialPos.y}
                    r={6}
                    fill={colorPrimitives.gray['1000']}
                    stroke={colorPrimitives.yellow['300']}
                    strokeWidth={2}
                  />
                )}

                {/* Scrubber lines synced via setNativeProps */}
                {selectedIndex !== null && (
                  <>
                    <Line
                      ref={vLineRef}
                      x1={initialPos.x}
                      y1={0}
                      x2={initialPos.x}
                      y2={containerHeight}
                      stroke={colorPrimitives.yellow['400']}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <Line
                      ref={hLineRef}
                      x1={paddingLeft}
                      y1={initialPos.y}
                      x2={containerWidth - paddingRight}
                      y2={initialPos.y}
                      stroke={colorPrimitives.yellow['400']}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </>
                )}
              </>
            );
          }
          return null;
        })()}
      </AnimatedG>
    </Svg >
  );
});

export const ChartSvg = React.memo(ChartSvgComponent);
