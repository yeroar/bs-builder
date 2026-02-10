import figma from "@figma/code-connect";
import SendBitcoin from "./SendBitcoin";

figma.connect(
  SendBitcoin,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=180-24167",
  {
    example: () => <SendBitcoin />,
  }
);
