import figma from "@figma/code-connect";
import TagHome from "./TagHome";

figma.connect(
  TagHome,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=73-8599",
  {
    example: () => <TagHome />,
  }
);
