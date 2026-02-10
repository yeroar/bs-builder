import figma from "@figma/code-connect";
import Rewards from "./Rewards";

figma.connect(
  Rewards,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-19298",
  {
    example: () => (
      <Rewards
        rewardsAmount="$n.nn"
        rewardsSats="n,nnn sats"
        pendingText="Pending: ~15.10 of BTC"
        onSendPress={() => {}}
        onSeeAllPress={() => {}}
      />
    ),
  }
);
