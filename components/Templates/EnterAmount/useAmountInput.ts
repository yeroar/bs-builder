import { useState, useCallback } from "react";

export interface UseAmountInputOptions {
  initialValue?: string;
  maxAmount?: number;
  maxDecimals?: number;
  onMaxExceeded?: () => void;
}

export interface UseAmountInputReturn {
  amount: string;
  setAmount: (value: string) => void;
  handleNumberPress: (num: string) => void;
  handleDecimalPress: () => void;
  handleBackspacePress: () => void;
  hasDecimal: boolean;
  isEmpty: boolean;
  formatDisplayValue: (val: string, prefix?: string) => string;
  formatWithCommas: (val: string) => string;
}

export default function useAmountInput({
  initialValue = "0",
  maxAmount,
  maxDecimals = 2,
  onMaxExceeded,
}: UseAmountInputOptions = {}): UseAmountInputReturn {
  const [amount, setAmount] = useState(initialValue);

  // Format number with comma separators (preserves user input)
  const formatWithCommas = useCallback((val: string): string => {
    if (val.includes(".")) {
      const [intPart, decPart] = val.split(".");
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${formattedInt}.${decPart}`;
    }
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  // Format for display with optional prefix
  const formatDisplayValue = useCallback((val: string, prefix = "$"): string => {
    if (val === "" || val === "0") return `${prefix}0`;
    return `${prefix}${formatWithCommas(val)}`;
  }, [formatWithCommas]);

  const handleNumberPress = useCallback((num: string) => {
    setAmount((prev) => {
      if (prev.length >= 10) return prev;

      let newAmount: string;
      if (prev === "0" && num !== ".") {
        newAmount = num;
      } else if (prev.includes(".")) {
        const [, decimals] = prev.split(".");
        if (decimals && decimals.length >= maxDecimals) return prev;
        newAmount = prev + num;
      } else {
        newAmount = prev + num;
      }

      // Check max amount if specified
      if (maxAmount !== undefined && parseFloat(newAmount) > maxAmount) {
        onMaxExceeded?.();
        return prev;
      }

      return newAmount;
    });
  }, [maxAmount, maxDecimals, onMaxExceeded]);

  const handleDecimalPress = useCallback(() => {
    setAmount((prev) => {
      if (prev.includes(".")) return prev;
      if (prev === "" || prev === "0") return "0.";
      return prev + ".";
    });
  }, []);

  const handleBackspacePress = useCallback(() => {
    setAmount((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  }, []);

  const hasDecimal = amount.includes(".");
  const isEmpty = amount === "0" || amount === "";

  return {
    amount,
    setAmount,
    handleNumberPress,
    handleDecimalPress,
    handleBackspacePress,
    hasDecimal,
    isEmpty,
    formatDisplayValue,
    formatWithCommas,
  };
}
