import React from "react";
import Divider from "./Divider";
import figma from "@figma/code-connect";

figma.connect(
  Divider,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=64-13815",
  {
    example: () => <Divider />,
  }
);
