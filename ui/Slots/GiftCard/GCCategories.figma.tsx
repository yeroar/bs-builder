import figma from "@figma/code-connect";
import GCCategories from "./GCCategories";

figma.connect(
  GCCategories,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=105-10401",
  {
    example: () => <GCCategories />,
  }
);
