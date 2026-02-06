import figma from "@figma/code-connect";
import ReceiveBitcoinSlot from "./ReceiveBitcoinSlot";

figma.connect(
  ReceiveBitcoinSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-24543",
  {
    example: () => <ReceiveBitcoinSlot />,
  }
);
