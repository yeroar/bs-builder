import React from "react";
import LeftColumn from "./LeftColumn";
import figma from "@figma/code-connect";

figma.connect(
  LeftColumn,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-18334",
  {
    props: {
      primaryText: figma.string("primaryText"),
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
      <LeftColumn
        primaryText={props.primaryText}
        secondaryText={props.secondaryText}
        chip={props.chip}
      />
    ),
  }
);
