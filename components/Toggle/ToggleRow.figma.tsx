import React from "react";
import ToggleRow from "./ToggleRow";
import figma from "@figma/code-connect";

figma.connect(
  ToggleRow,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-734",
  {
    props: {
      header: figma.string("header"),
      description: figma.boolean("hasDescription", {
        true: figma.string("description"),
        false: undefined,
      }),
      isSelected: figma.boolean("isSelected"),
      hasDiv: figma.boolean("hasDiv"),
      leadingSlot: figma.children("leadingSlot"),
    },
    example: (props) => (
      <ToggleRow
        header={props.header}
        description={props.description}
        isSelected={props.isSelected}
        hasDiv={props.hasDiv}
        leadingSlot={props.leadingSlot}
        onToggle={(value) => { }}
      />
    ),
  }
);
