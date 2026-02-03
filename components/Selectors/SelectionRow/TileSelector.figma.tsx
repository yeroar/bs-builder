import React from "react";
import TileSelector from "./TileSelector";
import figma from "@figma/code-connect";

figma.connect(
  TileSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-2545",
  {
    props: {
      label: figma.string("label"),
      variable: figma.string("variable"),
      state: figma.enum("state", {
        default: "default",
        pressed: "pressed",
        active: "active",
        focused: "focused",
      }),
    },
    example: (props) => (
      <TileSelector
        label={props.label}
        variable={props.variable}
        state={props.state}
        onPress={() => { }}
      />
    ),
  }
);
