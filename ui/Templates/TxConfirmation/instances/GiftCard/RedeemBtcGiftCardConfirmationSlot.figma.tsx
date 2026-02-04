import React from "react";
import figma from "@figma/code-connect";
import RedeemBtcGiftCardConfirmationSlot from "./RedeemBtcGiftCardConfirmationSlot";

figma.connect(
  RedeemBtcGiftCardConfirmationSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=141-23450",
  {
    props: {},
    example: () => <RedeemBtcGiftCardConfirmationSlot />,
  }
);
