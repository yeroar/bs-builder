import figma from "@figma/code-connect";
import BitcoinRewardsSlot from "./BitcoinRewardsSlot";

figma.connect(
  BitcoinRewardsSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-20149",
  {
    example: () => (
      <BitcoinRewardsSlot
        amount="$364.17"
        sats="400,240 sats"
        lifetimeRewardsValue="$720.42"
        lifetimeRewardsDenominator="576,479 sats"
        appreciationValue="$12,482.13 (+12%)"
        performanceValue="$45.23 (+9.43%)"
      />
    ),
  }
);
