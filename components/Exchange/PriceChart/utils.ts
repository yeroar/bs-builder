import { DataPoint, TimeRange } from './types';

export const DEFAULT_WIDTH = 375;
export const CONTAINER_HEIGHT = 338;
export const PADDING_LEFT = 2;
export const DOT_SPACING = 8;

/**
 * Generates a dense set of 288 points for any given time range.
 * For 1D: Synthetic random walk from 24h ago to now.
 * For others: Linear interpolation between existing daily points to reach 288.
 */
export const generateDenseData = (basePrice: number, range: TimeRange, sourcePoints: DataPoint[]): DataPoint[] => {
  const targetCount = 288;
  const densePoints: DataPoint[] = [];
  const now = new Date();

  if (range === '24H') {
    let currentPrice = basePrice;
    let min = basePrice;
    let max = basePrice;

    for (let i = 0; i < targetCount; i++) {
      const time = new Date(now.getTime() - (targetCount - 1 - i) * 5 * 60 * 1000);
      const volatility = 0.002;
      currentPrice += currentPrice * volatility * (Math.random() - 0.5);
      
      if (currentPrice < min) min = currentPrice;
      if (currentPrice > max) max = currentPrice;

      densePoints.push({ date: time.toISOString(), price: currentPrice });
    }

    return densePoints;
  }

  // For 1W, 1M, 1Y, ALL: Interpolate existing points
  if (sourcePoints.length < 2) {
    // Return base price as constant line of 288 points
    for (let i = 0; i < targetCount; i++) {
      const time = new Date(now.getTime() - (targetCount - 1 - i) * 5 * 60 * 1000);
      densePoints.push({ date: time.toISOString(), price: basePrice });
    }
    return densePoints;
  }

  const totalIntervals = targetCount - 1;
  const sourceIntervals = sourcePoints.length - 1;

  for (let i = 0; i < targetCount; i++) {
    const relativePos = i / totalIntervals;
    const sourceIndex = relativePos * sourceIntervals;
    const indexLow = Math.floor(sourceIndex);
    const indexHigh = Math.min(indexLow + 1, sourceIntervals);
    const weight = sourceIndex - indexLow;

    const pLow = sourcePoints[indexLow];
    const pHigh = sourcePoints[indexHigh];

    // Linear interpolation for price with noise for short ranges
    let interpolatedPrice = pLow.price + (pHigh.price - pLow.price) * weight;
    
    if (range === '1W' || range === '1M') {
      const volatility = range === '1W' ? 0.005 : 0.008;
      // Simple noise based on position to keep it deterministic (pseudo-random)
      const noise = Math.sin(i * 0.5) * Math.cos(i * 0.3) * interpolatedPrice * volatility;
      interpolatedPrice += noise;
    }
    
    // Interpolate date
    const dLow = new Date(pLow.date).getTime();
    const dHigh = new Date(pHigh.date).getTime();
    
    let interpolatedTimestamp = dLow + (dHigh - dLow) * weight;
    if (isNaN(interpolatedTimestamp)) {
      interpolatedTimestamp = dLow || Date.now();
    }
    
    const interpolatedDate = new Date(interpolatedTimestamp);
    densePoints.push({
      date: interpolatedDate.toISOString(),
      price: interpolatedPrice,
    });
  }

  return densePoints;
};

/**
 * Format date helper
 */
export const formatDate = (dateString: string, timeRange: TimeRange) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  // For 24H view, show time. For longer views, show date.
  if (timeRange === '24H') {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Generate a smooth Bézier curve path from data points
 * Uses cubic Bézier curves with tension for ultra-smooth, flowing curves
 */
export const generateSmoothPath = (points: { x: number; y: number }[], containerHeight: number): string => {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    // For two points, use a simple line
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  // Apply moving average smoothing to eliminate sharp spikes
  const smoothedPoints = points.map((point, i) => {
    if (i === 0 || i === points.length - 1) return point; // Keep endpoints
    
    // 3-point moving average for y values only (preserve x for timing)
    const prevY = points[i - 1].y;
    const currY = point.y;
    const nextY = points[i + 1].y;
    
    return {
      x: point.x,
      y: (prevY + currY * 2 + nextY) / 4, // Weighted average favoring current point
    };
  });

  let path = `M ${smoothedPoints[0].x} ${smoothedPoints[0].y}`;

  // Tension parameter: higher = rounder curves (0.5 for very flowing)
  const tension = 0.5;

  // Use cubic Bézier curves (C command) with calculated control points
  for (let i = 0; i < smoothedPoints.length - 1; i++) {
    const p0 = i > 0 ? smoothedPoints[i - 1] : smoothedPoints[i];
    const p1 = smoothedPoints[i];
    const p2 = smoothedPoints[i + 1];
    const p3 = i < smoothedPoints.length - 2 ? smoothedPoints[i + 2] : p2;

    // Calculate control points using Catmull-Rom to Bézier conversion
    const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
    const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;
    
    const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
    const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
};

/**
 * Generate smooth area path (for fill under the curve)
 */
export const generateSmoothAreaPath = (points: { x: number; y: number }[], containerHeight: number, existingLinePath?: string): string => {
  if (points.length === 0) return '';
  
  const linePath = existingLinePath || generateSmoothPath(points, containerHeight);
  if (!linePath) return '';

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  return `${linePath} L ${lastPoint.x} ${containerHeight} L ${firstPoint.x} ${containerHeight} Z`;
};

/**
 * Interpolate between two sets of points for smooth path morphing
 * Resamples both point sets to the same length and interpolates positions
 */
export const interpolatePath = (
  pointsA: { x: number; y: number }[],
  pointsB: { x: number; y: number }[],
  progress: number // 0 = pointsA, 1 = pointsB
): { x: number; y: number }[] => {
  if (pointsA.length === 0) return pointsB;
  if (pointsB.length === 0) return pointsA;
  
  // Use the longer array's length as target
  const targetLength = Math.max(pointsA.length, pointsB.length);
  
  // Resample both arrays to target length
  const resamplePoints = (points: { x: number; y: number }[], targetLen: number) => {
    if (points.length === targetLen) return points;
    
    const resampled: { x: number; y: number }[] = [];
    for (let i = 0; i < targetLen; i++) {
      const sourceIndex = (i / (targetLen - 1)) * (points.length - 1);
      const indexLow = Math.floor(sourceIndex);
      const indexHigh = Math.min(Math.ceil(sourceIndex), points.length - 1);
      const weight = sourceIndex - indexLow;
      
      const pLow = points[indexLow];
      const pHigh = points[indexHigh];
      
      resampled.push({
        x: pLow.x + (pHigh.x - pLow.x) * weight,
        y: pLow.y + (pHigh.y - pLow.y) * weight,
      });
    }
    return resampled;
  };
  
  const resampledA = resamplePoints(pointsA, targetLength);
  const resampledB = resamplePoints(pointsB, targetLength);
  
  // Interpolate between resampled points
  return resampledA.map((pA, i) => {
    const pB = resampledB[i];
    return {
      x: pA.x + (pB.x - pA.x) * progress,
      y: pA.y + (pB.y - pA.y) * progress,
    };
  });
};

/**
 * Generate linear path from interpolated points
 */
export const generateLinearPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  return path;
};

/**
 * Generate area path from interpolated points
 */
export const generateLinearAreaPath = (points: { x: number; y: number }[], containerHeight: number): string => {
  if (points.length === 0) return '';
  
  const linePath = generateLinearPath(points);
  if (!linePath) return '';
  
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  return `${linePath} L ${lastPoint.x} ${containerHeight} L ${firstPoint.x} ${containerHeight} Z`;
};
