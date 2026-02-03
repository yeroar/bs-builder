import React from "react";
import figma from "@figma/code-connect";
import { RocketIcon } from "./RocketIcon";

figma.connect(
  RocketIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=107-9846",
  {
    example: () => <RocketIcon width={24} height={24} />,
  }
);
