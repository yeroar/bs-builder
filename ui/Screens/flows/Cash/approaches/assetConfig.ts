/**
 * Asset configuration for approach testing.
 * This is a test-only helper — in production, Bitcoin and Cash are separate entities/flows.
 */

export type AssetType = "cash" | "bitcoin";

const BTC_PRICE_USD = 102_500;

interface AssetConfig {
  title: string;
  successTitle: string;
  unit: string;
  formatAmount: (usdAmount: number) => string;
  feeLabel: string;
  feeRate: number;
  destination: string;
}

const configs: Record<AssetType, AssetConfig> = {
  cash: {
    title: "Instant withdrawal",
    successTitle: "Withdrawal initiated",
    unit: "$",
    formatAmount: (usd) => `$${formatNum(usd)}`,
    feeLabel: "1.5%",
    feeRate: 0.015,
    destination: "debit card",
  },
  bitcoin: {
    title: "Send Bitcoin",
    successTitle: "Bitcoin sent",
    unit: "BTC",
    formatAmount: (usd) => `${(usd / BTC_PRICE_USD).toFixed(6)} BTC`,
    feeLabel: "Network fee",
    feeRate: 0.001,
    destination: "wallet",
  },
};

function formatNum(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getAssetConfig(type: AssetType): AssetConfig {
  return configs[type];
}
