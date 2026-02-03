import React from "react";
import SearchPill from "./SearchPill";
import figma from "@figma/code-connect";

figma.connect(
  SearchPill,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=101-25054",
  {
    props: {
      label: figma.string("label"),
      hasAvatar: figma.boolean("hasAvatar"),
      hasChip: figma.boolean("hasChip"),
    },
    example: (props) => (
      <SearchPill
        label={props.label}
        hasAvatar={props.hasAvatar}
        hasChip={props.hasChip}
        brand="Chewy"
        chipLabel="Up to n%"
        onPress={() => {}}
      />
    ),
  }
);
