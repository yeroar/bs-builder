import figma from "@figma/code-connect";
import { ScanIcon } from "./ScanIcon";

figma.connect(
  ScanIcon,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-28411",
  {
    example: () => <ScanIcon />,
  }
);
