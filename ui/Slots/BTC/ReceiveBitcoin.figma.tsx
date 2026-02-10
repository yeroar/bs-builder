import figma from "@figma/code-connect";
import ReceiveBitcoin from "./ReceiveBitcoin";

figma.connect(
  ReceiveBitcoin,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-24543",
  {
    example: () => <ReceiveBitcoin />,
  }
);
