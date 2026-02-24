import SunIcon from "./SunIcon";
import figma from "@figma/code-connect";

figma.connect(
  SunIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=273-18334",
  {
    example: () => <SunIcon />,
  }
);
