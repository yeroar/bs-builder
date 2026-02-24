import React from "react";
import figma from "@figma/code-connect";
import GiftCardTemplate from "./GiftCardTemplate";

figma.connect(GiftCardTemplate, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=277:22843", {
  example: () => <GiftCardTemplate chipLabel="Up to {n}% sats back" />,
});
