import React from "react";
import { DeleteIcon } from "./DeleteIcon";
import figma from "@figma/code-connect";

figma.connect(
  DeleteIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18399",
  {
    example: () => <DeleteIcon />,
  }
);
