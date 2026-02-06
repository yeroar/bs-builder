import figma from "@figma/code-connect";
import { BitcoinStrokeIcon } from "./BitcoinStrokeIcon";

figma.connect(
  BitcoinStrokeIcon,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-28993",
  {
    example: () => <BitcoinStrokeIcon />,
  }
);
