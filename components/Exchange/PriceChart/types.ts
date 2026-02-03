export type TimeRange = '24H' | '1W' | '1M' | '1Y' | 'ALL';

export interface DataPoint {
  date: string;
  price: number;
}

export interface PriceChartContainerProps {
  timeRange?: TimeRange;
  onPriceChange?: (price: number, date: string, percentage: number) => void;
  onRangeInfo?: (percentage: number) => void;
}

export interface Point {
  x: number;
  y: number;
}
