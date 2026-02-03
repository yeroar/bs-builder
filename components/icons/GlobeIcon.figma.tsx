import React from "react";
import figma from "@figma/code-connect";
import { GlobeIcon } from "./GlobeIcon";

figma.connect(
  GlobeIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=107-10265",
  {
    example: () => <GlobeIcon />,
  }
);
