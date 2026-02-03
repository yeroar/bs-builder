import React from "react";
import CategoryBoostsTile from "./CategoryBoostsTile";
import figma from "@figma/code-connect";

figma.connect(
  CategoryBoostsTile,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-12902",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("secondary"),
      tertiaryText: figma.string("tertiary"),
      variant: figma.enum("type", {
        horizontal: "horizontal",
        vertical: "vertical",
      }),
      leadingSlot: figma.children("leadingSlot"),
    },
    example: (props) => (
      <CategoryBoostsTile
        variant={props.variant}
        title={props.title}
        secondaryText={props.secondaryText}
        tertiaryText={props.tertiaryText}
        leadingSlot={props.leadingSlot}
      />
    ),
  }
);
