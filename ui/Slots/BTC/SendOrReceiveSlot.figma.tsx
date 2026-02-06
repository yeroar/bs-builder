import figma from "@figma/code-connect";
import SendOrReceiveSlot from "./SendOrReceiveSlot";

figma.connect(
  SendOrReceiveSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-23795",
  {
    example: () => <SendOrReceiveSlot />,
  }
);
