import React from "react";
import RowSelector from "./RowSelector";
import figma from "@figma/code-connect";

figma.connect(
  RowSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-2520",
  {
    props: {
      label: figma.string("label"),
      description: figma.string("description"),
      state: figma.enum("state", {
        default: "default",
        pressed: "pressed",
        active: "active",
      }),
      hasChip: figma.boolean("hasChip"),
    },
    example: (props) => (
      <RowSelector
        label={props.label}
        description={props.description}
        state={props.state}
        hasChip={props.hasChip}
        onPress={() => { }}
      />
    ),
  }
);
