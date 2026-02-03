import React from "react";
import figma from "@figma/code-connect";
import { StarIcon } from "./StarIcon";

figma.connect(
  StarIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=109-11630",
  {
    example: () => <StarIcon />,
  }
);
