import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import ButtonSelector from "../../Buttons/ButtonSelector/ButtonSelector";
import { spacing } from "../../tokens";

export interface QuickBuyItem<T = number> {
  label: string;
  value: T;
}

export interface QuickBuyInputProps<T = number> {
  items?: QuickBuyItem<T>[];
  amounts?: number[];
  selectedValue?: T | null;
  selectedAmount?: number | null;
  onSelect?: (value: T) => void;
  onAmountSelect?: (amount: number) => void;
  columns?: 2 | 3 | 4;
  formatLabel?: (amount: number) => string;
  style?: ViewStyle;
}

export default function QuickBuyInput<T = number>({
  items,
  amounts,
  selectedValue,
  selectedAmount,
  onSelect,
  onAmountSelect,
  columns = 2,
  formatLabel = (amount) => `$${amount}`,
  style,
}: QuickBuyInputProps<T>) {
  // Support both items array and amounts array for backwards compatibility
  const resolvedItems: QuickBuyItem<any>[] = items ||
    (amounts?.map(amount => ({ label: formatLabel(amount), value: amount })) ?? []);

  const selected = selectedValue ?? selectedAmount;
  const handleSelect = (value: any) => {
    onSelect?.(value);
    if (typeof value === 'number') {
      onAmountSelect?.(value);
    }
  };

  // Split items into rows based on columns
  const rows: QuickBuyItem<any>[][] = [];
  for (let i = 0; i < resolvedItems.length; i += columns) {
    rows.push(resolvedItems.slice(i, i + columns));
  }

  return (
    <View style={[styles.container, style]}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => (
            <ButtonSelector
              key={`${rowIndex}-${index}`}
              label={item.label}
              isSelected={selected === item.value}
              onPress={() => handleSelect(item.value)}
              style={styles.button}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["300"],
  },
  row: {
    flexDirection: "row",
    gap: spacing["300"],
  },
  button: {
    flex: 1,
  },
});
