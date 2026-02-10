import figma from "@figma/code-connect";
import DirectToBitcoinIntro from "./DirectToBitcoinIntro";

figma.connect(
  DirectToBitcoinIntro,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=219-26572",
  {
    example: () => <DirectToBitcoinIntro />,
  }
);
