import React from "react";
import { SwapIcon } from "./SwapIcon";
import figma from "@figma/code-connect";

figma.connect(
  SwapIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-19767",
  {
    props: {},
    example: () => <SwapIcon />,
  }
);
