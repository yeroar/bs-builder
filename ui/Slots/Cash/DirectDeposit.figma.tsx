import figma from "@figma/code-connect";
import DirectDeposit from "./DirectDeposit";

figma.connect(
  DirectDeposit,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-40839",
  {
    example: () => <DirectDeposit />,
  }
);
