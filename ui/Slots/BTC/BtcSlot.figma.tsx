import React from "react";
import BtcSlot from "./BtcSlot";
import figma from "@figma/code-connect";

figma.connect(
  BtcSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-17996",
  {
    example: () => (
      <BtcSlot
        bitcoinAmount="฿0.08"
        bitcoinAvailable="฿0.07 available"
        rewardsAmount="$21.00"
        rewardsSats="18,434 sats"
        onBuyPress={() => {}}
        onSellPress={() => {}}
        onSendPress={() => {}}
        onAutoStackPress={() => {}}
        onDirectToBitcoinPress={() => {}}
        onSeeAllTransactionsPress={() => {}}
        onRewardsPress={() => {}}
      />
    ),
  }
);
