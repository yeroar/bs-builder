import figma from "@figma/code-connect";
import Scan from "./Scan";

figma.connect(
  Scan,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29286",
  {
    example: () => <Scan />,
  }
);
