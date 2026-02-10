import figma from "@figma/code-connect";
import DirectToBitcoinSlot from "./DirectToBitcoinSlot";

figma.connect(
  DirectToBitcoinSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-18040",
  {
    example: () => <DirectToBitcoinSlot />,
  }
);
