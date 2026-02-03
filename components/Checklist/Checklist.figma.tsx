import React from "react";
import Checklist from "./Checklist";
import figma from "@figma/code-connect";

figma.connect(
  Checklist,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=31-539",
  {
    props: {
      label: figma.string("label"),
      isSelected: figma.boolean("isSelected"),
      hasDiv: figma.boolean("hasDiv"),
    },
    example: (props) => (
      <Checklist
        label={props.label}
        isSelected={props.isSelected}
        hasDiv={props.hasDiv}
        onPress={() => { }}
      />
    ),
  }
);
