import figma from "@figma/code-connect";
import FrequencyAutoStackSlot from "./FrequencyAutoStackSlot";

figma.connect(
  FrequencyAutoStackSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-23545",
  {
    example: () => <FrequencyAutoStackSlot />,
  }
);
