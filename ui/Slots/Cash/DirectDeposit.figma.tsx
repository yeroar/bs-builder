import figma from "@figma/code-connect";
import DirectDepositSlot from "./DirectDepositSlot";

figma.connect(
  DirectDepositSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-40839",
  {
    example: () => <DirectDepositSlot />,
  }
);
