import figma from "@figma/code-connect";
import TagHomeSlot from "./TagHomeSlot";

figma.connect(
  TagHomeSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=73-8599",
  {
    example: () => <TagHomeSlot />,
  }
);
