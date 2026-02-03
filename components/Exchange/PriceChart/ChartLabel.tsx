import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { typographyStyles } from '../../tokens';
import { formatDate } from './utils';
import { TimeRange } from './types';

interface ChartLabelProps {
  date: string;
  timeRange: TimeRange;
  clampedX: number;
}

export const ChartLabel: React.FC<ChartLabelProps> = memo(({ date, timeRange, clampedX }) => {
  return (
    <View style={[styles.labelContainer, { left: clampedX }]} pointerEvents="none">
      <Text style={[styles.label, typographyStyles['body-sm-bold']]} numberOfLines={1} ellipsizeMode="clip">
        {formatDate(date, timeRange)}
      </Text>
    </View>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the position changes OR the date content changes
  // This helps avoid blinking if the parent re-renders for other reasons
  return prevProps.clampedX === nextProps.clampedX && prevProps.date === nextProps.date && prevProps.timeRange === nextProps.timeRange;
});
