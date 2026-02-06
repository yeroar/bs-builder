import figma from "@figma/code-connect";
import DirectToBitcoinConfirmSlot from "./DirectToBitcoinConfirmSlot";

figma.connect(
  DirectToBitcoinConfirmSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-23450",
  {
    example: () => <DirectToBitcoinConfirmSlot />,
  }
);
