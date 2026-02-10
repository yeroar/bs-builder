import figma from "@figma/code-connect";
import RewardsSlot from "./RewardsSlot";

figma.connect(
  RewardsSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-19298",
  {
    example: () => (
      <RewardsSlot
        rewardsAmount="$n.nn"
        rewardsSats="n,nnn sats"
        pendingText="Pending: ~15.10 of BTC"
        onSendPress={() => {}}
        onSeeAllPress={() => {}}
      />
    ),
  }
);
