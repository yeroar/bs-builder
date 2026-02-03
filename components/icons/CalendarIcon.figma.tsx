import figma from "@figma/code-connect";
import { CalendarIcon } from "./CalendarIcon";

figma.connect(
  CalendarIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=119-13746",
  {
    example: () => <CalendarIcon />,
  }
);
