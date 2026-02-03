import React from "react";
import RightColumn from "./RightColumn";
import figma from "@figma/code-connect";

figma.connect(
  RightColumn,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-18335",
  {
    props: {
      primaryText: figma.string("primatyText"), // Note: typo in Figma prop name
      hasSecondaryText: figma.boolean("hasSecondaryText"),
      secondaryText: figma.boolean("hasSecondaryText", {
        true: figma.string("secondaryText"),
        false: undefined,
      }),
      hasChip: figma.boolean("hasChip"),
      chip: figma.boolean("hasChip", {
        true: figma.children("chip"),
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
