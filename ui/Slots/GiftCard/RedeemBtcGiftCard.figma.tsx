import React from "react";
import figma from "@figma/code-connect";
import RedeemBtcGiftCard from "./RedeemBtcGiftCard";

figma.connect(
  RedeemBtcGiftCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=141-25063",
  {
    props: {},
    example: () => <RedeemBtcGiftCard />,
  }
);
