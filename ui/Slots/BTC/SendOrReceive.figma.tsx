import figma from "@figma/code-connect";
import SendOrReceive from "./SendOrReceive";

figma.connect(
  SendOrReceive,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-23795",
  {
    example: () => <SendOrReceive />,
  }
);
