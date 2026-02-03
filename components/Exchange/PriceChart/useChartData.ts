import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import Papa from 'papaparse';
import { DataPoint, TimeRange } from './types';
import { generateDenseData } from './utils';

export const useChartData = (
  timeRange: TimeRange,
  onPriceChange: (price: number, date: string, percentage: number) => void,
  onRangeInfo: (percentage: number) => void
) => {
  const [rawData, setRawData] = useState<DataPoint[]>([]);
  const [data, setData] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const onPriceChangeRef = useRef(onPriceChange);
  const onRangeInfoRef = useRef(onRangeInfo);

  useEffect(() => {
    onPriceChangeRef.current = onPriceChange;
    onRangeInfoRef.current = onRangeInfo;
  }, [onPriceChange, onRangeInfo]);

  // Load raw data from CSV
  useEffect(() => {
    const loadData = async () => {
      try {
        const asset = Asset.fromModule(require('./btc-usd-max.csv'));
        await asset.downloadAsync();
        
        if (!asset.localUri) {
          setError('Failed to get localUri');
          throw new Error('Failed to load CSV asset');
        }

        const csvText = await FileSystem.readAsStringAsync(asset.localUri);
        
        Papa.parse<{ snapped_at: string; price: string }>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed: DataPoint[] = results.data
              .filter(row => row.snapped_at && row.price && !isNaN(parseFloat(row.price)))
              .map(row => ({
                date: row.snapped_at.replace(' ', 'T').replace(' UTC', 'Z'),
                price: parseFloat(row.price),
              }));
            
            if (parsed.length === 0) setError('CSV Empty');
            else setError(null);
            console.log('[useChartData] loaded rawData:', parsed.length, 'first price:', parsed[0]?.price);
            setRawData(parsed);
          },
          error: (err: Error) => {
            console.error('[useChartData] PapaParse Error:', err.message);
            setError('PapaParse Error: ' + err.message);
          },
        });
      } catch (err: any) {
        console.error('[useChartData] Asset Error:', err.message);
        setError('Asset Error: ' + (err.message || 'Unknown'));
      }
    };

    loadData();
  }, []);

  // Filter and animate data on timeRange change
  useEffect(() => {
    if (rawData.length === 0) return;

    let filtered: DataPoint[] = [];

    if (timeRange === '24H') {
      const latestPoint = rawData[rawData.length - 1];
      if (latestPoint) {
        filtered = generateDenseData(latestPoint.price, '24H', [latestPoint]);
      }
    } else {
      let rangePoints: DataPoint[] = [];
      if (timeRange === '1W') rangePoints = rawData.slice(-7);
      else if (timeRange === '1M') rangePoints = rawData.slice(-30);
      else if (timeRange === '1Y') rangePoints = rawData.slice(-365);
      else rangePoints = [...rawData];

      if (rangePoints.length > 0) {
        filtered = generateDenseData(rangePoints[rangePoints.length - 1].price, timeRange, rangePoints);
      }
    }

    if (filtered.length === 0) return;
    const targetPoints = filtered;

    // Update data immediately. Visual morphing is now handled by ChartSvg natively.
    setData(targetPoints);
    console.log('[useChartData] data state set to:', targetPoints.length, 'points. range:', timeRange);

    // Performance sync
    const startPrice = targetPoints[0].price;
    const endPrice = targetPoints[targetPoints.length - 1].price;
    const pct = startPrice !== 0 ? ((endPrice - startPrice) / startPrice) * 100 : 0;
    
    if (onRangeInfoRef.current) onRangeInfoRef.current(pct);
    if (onPriceChangeRef.current) {
      onPriceChangeRef.current(endPrice, targetPoints[targetPoints.length - 1].date, pct);
    }
  }, [rawData, timeRange]);


  return { data, error };
};
