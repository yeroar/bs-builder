import React from "react";
import CoinsStackedIcon from "./CoinsStackedIcon";
import figma from "@figma/code-connect";

figma.connect(
  CoinsStackedIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=59-10393",
  {
    props: {},
    example: () => <CoinsStackedIcon />,
  }
);
