import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, PanResponder, Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';
import { PriceChartContainerProps, DataPoint, Point } from './types';
import { DEFAULT_WIDTH, CONTAINER_HEIGHT, PADDING_LEFT, generateSmoothPath, generateSmoothAreaPath } from './utils';
import { styles } from './styles';
import { useChartData } from './useChartData';
import { ChartSvg, ChartSvgHandle } from './ChartSvg';
import { ChartSkeleton } from './ChartSkeleton';
import { ChartLabel } from './ChartLabel';

import { useExchange } from '../ExchangeContext';

const PriceChartContainerComponent = (props: PriceChartContainerProps) => {
  const context = useExchange();

  const {
    timeRange: propTimeRange,
    onPriceChange,
    onRangeInfo,
  } = props;

  const timePeriod = propTimeRange || context.selectedPeriod.toUpperCase();
  const timeRange = timePeriod as any;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [crosshairX, setCrosshairX] = useState<number | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(CONTAINER_HEIGHT);
  const [containerWidth, setContainerWidth] = useState<number>(DEFAULT_WIDTH);
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  const chartSvgRef = useRef<ChartSvgHandle>(null);
  const selectedIndexRef = useRef<number | null>(null);

  // Padding only for 24H view
  const hPaddingLeft = timeRange === '24H' ? PADDING_LEFT : 0;
  const hPaddingRight = timeRange === '24H' ? 20 : 0;
  const drawWidth = containerWidth - hPaddingLeft - hPaddingRight;

  const onPriceChangeRef = useRef(onPriceChange);
  const onRangeInfoRef = useRef(onRangeInfo);

  useEffect(() => {
    onPriceChangeRef.current = onPriceChange;
    onRangeInfoRef.current = onRangeInfo;
  }, [onPriceChange, onRangeInfo]);

  const { data, error } = useChartData(
    timeRange,
    (price, date, pct) => {
      onPriceChangeRef.current?.(price, date, pct);
      if (!onPriceChange) context.setCurrentPrice(price);
      if (!onPriceChange) context.setCurrentPercentage(pct);
    },
    (pct) => {
      onRangeInfoRef.current?.(pct);
      if (!onRangeInfo) context.setCurrentPercentage(pct);
    }
  );

  useEffect(() => {
    if (data.length > 0) {
      setIsSkeletonVisible(false);
    }
  }, [data.length]);

  const dataRef = useRef<DataPoint[]>([]);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (timeRange === '24H' && selectedIndex === null) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(0);
      pulseAnim.stopAnimation();
    }
  }, [timeRange, selectedIndex, pulseAnim]);

  // Robust Selection Logic
  const updateSelection = useCallback((x: number, isMove = false) => {
    const currentData = dataRef.current;
    if (currentData.length === 0 || drawWidth === 0) return;

    // Use current render's padding and width for precision
    const constrainedX = Math.max(hPaddingLeft, Math.min(containerWidth - hPaddingRight, x));
    const relativeX = constrainedX - hPaddingLeft;

    // Float index for butter-smooth visual glide
    const floatIndex = (relativeX / drawWidth) * (currentData.length - 1);
    // Integer index for label/price snapping
    const clampedIndex = Math.max(0, Math.min(currentData.length - 1, Math.round(floatIndex)));

    const snappedX = hPaddingLeft + (clampedIndex / (currentData.length - 1)) * drawWidth;

    // Push FLOAT to SVG natively for sub-pixel precision glide
    if (chartSvgRef.current) {
      chartSvgRef.current.setNativeInteraction(floatIndex, true);
    }

    // Only update React state on initial tap or if moving to a new discrete point
    if (!isMove || clampedIndex !== selectedIndexRef.current) {
      setSelectedIndex(clampedIndex);
      setCrosshairX(snappedX);
      if (clampedIndex !== selectedIndexRef.current) {
        Haptics.selectionAsync();
      }
      selectedIndexRef.current = clampedIndex;

      const point = currentData[clampedIndex];
      if (onPriceChangeRef.current && point) {
        const startPrice = currentData[0].price;
        const pct = startPrice !== 0 ? ((point.price - startPrice) / startPrice) * 100 : 0;
        onPriceChangeRef.current(point.price, point.date, pct);
      }
    }
  }, [data, drawWidth, containerWidth, hPaddingLeft, hPaddingRight]);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (evt) => {
      setIsInteracting(true);
      updateSelection(evt.nativeEvent.locationX);
    },
    onPanResponderMove: (evt) => {
      updateSelection(evt.nativeEvent.locationX, true);
    },
    onPanResponderRelease: () => {
      setIsInteracting(false);
      setSelectedIndex(null);
      setCrosshairX(null);
      selectedIndexRef.current = null;
      if (chartSvgRef.current) {
        chartSvgRef.current.setNativeInteraction(null, false);
      }

      const currentData = dataRef.current;
      if (currentData.length > 0) {
        const startPrice = currentData[0].price;
        const endPoint = currentData[currentData.length - 1];
        const pct = startPrice !== 0 ? ((endPoint.price - startPrice) / startPrice) * 100 : 0;
        onPriceChangeRef.current?.(endPoint.price, endPoint.date, pct);
        if (!onPriceChange) {
          context.setCurrentPrice(endPoint.price);
          context.setCurrentPercentage(pct);
        }
      }
    },
    onPanResponderTerminate: () => {
      setIsInteracting(false);
      setSelectedIndex(null);
      setCrosshairX(null);
      selectedIndexRef.current = null;
      if (chartSvgRef.current) {
        chartSvgRef.current.setNativeInteraction(null, false);
      }
    },
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
  }), [updateSelection]);

  const chartGeometry = useMemo(() => {
    if (data.length < 2) {
      return {
        linePath: '',
        areaPath: '',
        smoothLinePath: '',
        smoothAreaPath: '',
        points: [] as Point[],
        resampledSmoothPts: [] as Point[]
      };
    }

    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const currentDrawWidth = containerWidth - hPaddingLeft - hPaddingRight;

    const pts = data.map((point, index) => {
      const x = hPaddingLeft + (index / (data.length - 1)) * currentDrawWidth;
      const normalizedPrice = (point.price - minPrice) / priceRange;
      const y = containerHeight - (normalizedPrice * containerHeight);
      return { x, y };
    });

    // Detailed Paths
    const linePath = generateSmoothPath(pts, containerHeight);
    const areaPath = generateSmoothAreaPath(pts, containerHeight);

    // Simplified Path: 20 points for a detailed but flowing look
    const rawSmoothPts: Point[] = [];
    const numSmoothPoints = 20;
    for (let i = 0; i < numSmoothPoints; i++) {
      const centerIdx = Math.round((i / (numSmoothPoints - 1)) * (pts.length - 1));

      // Cluster averaging to "denoise" the simplified view
      let sumY = 0;
      let count = 0;
      const window = 3; // Look at 3 neighbors on each side
      for (let j = centerIdx - window; j <= centerIdx + window; j++) {
        if (pts[j]) {
          sumY += pts[j].y;
          count++;
        }
      }

      rawSmoothPts.push({
        x: pts[centerIdx].x,
        y: sumY / count
      });
    }

    // Smooth Line/Area paths for the base states
    const smoothLinePath = generateSmoothPath(rawSmoothPts, containerHeight);
    const smoothAreaPath = generateSmoothAreaPath(rawSmoothPts, containerHeight, smoothLinePath);

    // Resampled smooth points
    const resampledSmoothPts: { x: number, y: number }[] = [];
    for (let i = 0; i < pts.length; i++) {
      const sourcePos = (i / (pts.length - 1)) * (rawSmoothPts.length - 1);
      const indexLow = Math.floor(sourcePos);
      const indexHigh = Math.min(indexLow + 1, rawSmoothPts.length - 1);
      const weight = sourcePos - indexLow;

      const pLow = rawSmoothPts[indexLow];
      const pHigh = rawSmoothPts[indexHigh];

      resampledSmoothPts.push({
        x: pLow.x + (pHigh.x - pLow.x) * weight,
        y: pLow.y + (pHigh.y - pLow.y) * weight,
      });
    }

    return {
      linePath,
      areaPath,
      smoothLinePath,
      smoothAreaPath,
      points: pts,
      resampledSmoothPts
    };
  }, [data, containerWidth, containerHeight, hPaddingLeft, hPaddingRight]);

  const previousChartGeometryRef = useRef(chartGeometry);
  useEffect(() => {
    previousChartGeometryRef.current = chartGeometry;
  }, [chartGeometry]);

  const selectedData = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <View style={styles.wrapper}>
      {selectedData && crosshairX !== null && (
        <ChartLabel
          date={selectedData.date}
          timeRange={timeRange}
          clampedX={Math.max(55, Math.min(containerWidth - 55, crosshairX))}
        />
      )}

      <View
        style={styles.container}
        {...panResponder.panHandlers}
        onLayout={(e) => {
          const { height, width } = e.nativeEvent.layout;
          if (height > 0 && Math.floor(height) !== containerHeight) setContainerHeight(Math.floor(height));
          if (width > 0 && Math.floor(width) !== containerWidth) setContainerWidth(Math.floor(width));
        }}
        collapsable={false}
      >
        {isSkeletonVisible || data.length === 0 ? (
          <ChartSkeleton width={containerWidth} height={containerHeight} />
        ) : (
          <ChartSvg
            ref={chartSvgRef}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            data={data}
            timeRange={timeRange}
            drawWidth={drawWidth}
            paddingLeft={hPaddingLeft}
            paddingRight={hPaddingRight}
            crosshairX={crosshairX}
            selectedIndex={selectedIndex}
            chartGeometry={chartGeometry}
            previousChartGeometry={previousChartGeometryRef.current}
            pulseAnim={pulseAnim}
            isInteracting={isInteracting}
          />
        )}
      </View>
    </View>
  );
};

export const PriceChartContainer = React.memo(PriceChartContainerComponent);
