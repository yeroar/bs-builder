import React from "react";
import figma from "@figma/code-connect";
import RedeemBtcGiftCardSlot from "./RedeemBtcGiftCardSlot";

figma.connect(
  RedeemBtcGiftCardSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=141-25063",
  {
    props: {},
    example: () => <RedeemBtcGiftCardSlot />,
  }
);
