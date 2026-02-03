import React from "react";
import { CircleIcon } from "./CircleIcon";
import figma from "@figma/code-connect";

figma.connect(
  CircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=31-563",
  {
    example: () => <CircleIcon />,
  }
);
