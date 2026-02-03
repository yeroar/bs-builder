import React from "react";
import SpinIcon from "./SpinIcon";
import figma from "@figma/code-connect";

figma.connect(
  SpinIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-9496",
  {
    props: {},
    example: (props) => <SpinIcon />,
  }
);
