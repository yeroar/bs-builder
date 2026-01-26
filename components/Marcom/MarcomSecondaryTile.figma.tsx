import React from "react";
import MarcomSecondaryTile from "./MarcomSecondaryTile";
import figma from "@figma/code-connect";

figma.connect(
  MarcomSecondaryTile,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-21897",
  {
    props: {
      header: figma.string("header"),
      hasBodyText: figma.boolean("hasBodyText"),
      bodyText: figma.string("bodyText"),
    },
    example: (props) => (
      <MarcomSecondaryTile
        header={props.header}
        bodyText={props.hasBodyText ? props.bodyText : undefined}
      />
    ),
  }
);
