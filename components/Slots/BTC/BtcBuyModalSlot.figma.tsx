import React from "react";
import BtcBuyModalSlot from "./BtcBuyModalSlot";
import figma from "@figma/code-connect";

figma.connect(
  BtcBuyModalSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18340",
  {
    example: () => (
      <BtcBuyModalSlot
        selectedAmount={null}
        onSelectAmount={(amount) => console.log(amount)}
      />
    ),
  }
);
