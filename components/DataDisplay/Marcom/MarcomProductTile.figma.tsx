import React from "react";
import MarcomProductTile from "./MarcomProductTile";
import figma from "@figma/code-connect";

figma.connect(
  MarcomProductTile,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-5959",
  {
    props: {
      label: figma.string("label"),
      message: figma.string("message"),
      button: figma.boolean("hasButton", {
        true: figma.children("button"),
        false: undefined,
      }),
    },
    example: (props) => (
      <MarcomProductTile
        label={props.label}
        message={props.message}
        button={props.button}
      />
    ),
  }
);
