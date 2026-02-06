import figma from "@figma/code-connect";
import SendBitcoinSlot from "./SendBitcoinSlot";

figma.connect(
  SendBitcoinSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=180-24167",
  {
    example: () => <SendBitcoinSlot />,
  }
);
