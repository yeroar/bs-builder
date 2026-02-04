import React from "react";
import SettingsIcon from "./SettingsIcon";
import figma from "@figma/code-connect";

figma.connect(
  SettingsIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=145-8138",
  {
    props: {},
    example: () => <SettingsIcon />,
  }
);
