import figma from "@figma/code-connect";
import ScanSlot from "./ScanSlot";

figma.connect(
  ScanSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29286",
  {
    example: () => <ScanSlot />,
  }
);
