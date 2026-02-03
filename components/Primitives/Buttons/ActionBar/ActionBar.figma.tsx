import React from "react";
import ActionBar from "./ActionBar";
import figma from "@figma/code-connect";

figma.connect(
  ActionBar,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=131-16197",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => <ActionBar>{props.children}</ActionBar>,
  }
);
