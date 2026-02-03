import React from "react";
import SelectionRowGroup from "./SelectionRowGroup";
import figma from "@figma/code-connect";

figma.connect(
  SelectionRowGroup,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-587",
  {
    props: {
      children: figma.children("selectionRow"),
    },
    example: (props) => (
      <SelectionRowGroup>
        {props.children}
      </SelectionRowGroup>
    ),
  }
);
