import figma from "@figma/code-connect";
import { CalendarPlusIcon } from "./CalendarPlusIcon";

figma.connect(
  CalendarPlusIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=133-16474",
  {
    example: () => <CalendarPlusIcon />,
  }
);
