import figma from "@figma/code-connect";
import FrequencyAutoStack from "./FrequencyAutoStack";

figma.connect(
  FrequencyAutoStack,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-23545",
  {
    example: () => <FrequencyAutoStack />,
  }
);
