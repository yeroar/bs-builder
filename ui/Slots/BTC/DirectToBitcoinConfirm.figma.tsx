import figma from "@figma/code-connect";
import DirectToBitcoinConfirm from "./DirectToBitcoinConfirm";

figma.connect(
  DirectToBitcoinConfirm,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=219-27351",
  {
    example: () => <DirectToBitcoinConfirm />,
  }
);
