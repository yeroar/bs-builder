import React from "react";
import figma from "@figma/code-connect";
import { BitcoinCircleIcon } from "./BitcoinCircleIcon";

figma.connect(
  BitcoinCircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18764",
  {
    props: {},
    example: () => <BitcoinCircleIcon />,
  }
);
