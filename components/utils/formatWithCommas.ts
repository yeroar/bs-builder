export function formatWithCommas(num: number, decimals = 2): string {
  const fixed = num.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedInt}.${decPart}`;
}

// approximate=true → "~10,000 sats" (for BTC price conversions)
// approximate=false → "10,000 sats" (for exact send/receive amounts)
export function formatSats(sats: number, opts?: { approximate?: boolean }): string {
  const formatted = String(Math.round(sats)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (opts?.approximate ?? true) ? `~${formatted} sats` : `${formatted} sats`;
}

// For keypad enter-amount screens (string input)
export function formatSatsInput(value: string): string {
  if (!value || value === "0") return "0 sats";
  const num = parseInt(value, 10);
  if (isNaN(num)) return "0 sats";
  return `${num.toLocaleString()} sats`;
}
