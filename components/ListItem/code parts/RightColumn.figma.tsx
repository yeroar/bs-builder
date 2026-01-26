import React from "react";
import RightColumn from "./RightColumn";
import figma from "@figma/code-connect";

figma.connect(
  RightColumn,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-18335",
  {
    props: {
      primaryText: figma.boolean("hasPrimatyText", {
        true: figma.string("primatyText"),
        false: undefined,
      }),
      secondaryText: figma.string("secondaryText"),
      chip: figma.boolean("hasChip", {
        true: figma.instance("chip"),
        false: undefined,
      }),
    },
    example: (props) => (
      <RightColumn
        primaryText={props.primaryText}
        secondaryText={props.secondaryText}
        chip={props.chip}
      />
    ),
  }
);
