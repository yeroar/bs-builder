import React, { createContext, useContext, useState, ReactNode } from "react";

export type TimeRange = "24H" | "1W" | "1M" | "1Y" | "ALL";

interface ExchangeContextType {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  currentPrice: number | string | undefined;
  setCurrentPrice: (price: number | string | undefined) => void;
  currentPercentage: number | undefined;
  setCurrentPercentage: (percentage: number | undefined) => void;
  onHistoryPress?: () => void;
}

const ExchangeContext = createContext<ExchangeContextType | undefined>(undefined);

export function useExchange() {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error("useExchange must be used within an ExchangeProvider");
  }
  return context;
}

interface ExchangeProviderProps {
  children: ReactNode;
  onAction?: () => void;
}

export function ExchangeProvider({ children, onAction }: ExchangeProviderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [currentPrice, setCurrentPrice] = useState<number | string | undefined>(undefined);
  const [currentPercentage, setCurrentPercentage] = useState<number | undefined>(undefined);

  return (
    <ExchangeContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,
        currentPrice,
        setCurrentPrice,
        currentPercentage,
        setCurrentPercentage,
        onHistoryPress: onAction,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}
