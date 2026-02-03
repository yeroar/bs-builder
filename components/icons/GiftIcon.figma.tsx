import React from "react";
import figma from "@figma/code-connect";
import { GiftIcon } from "./GiftIcon";

figma.connect(
  GiftIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=109-11492",
  {
    example: () => <GiftIcon />,
  }
);
