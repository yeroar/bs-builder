import figma from "@figma/code-connect";
import DirectToBitcoin from "./DirectToBitcoin";

figma.connect(
  DirectToBitcoin,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-18040",
  {
    example: () => <DirectToBitcoin />,
  }
);
