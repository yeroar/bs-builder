import React from "react";
import Toggle from "./Toggle";
import figma from "@figma/code-connect";

figma.connect(
  Toggle,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-21871",
  {
    props: {
      value: figma.boolean("State"),
    },
    example: (props) => (
      <Toggle
        value={props.value}
        onValueChange={(value) => { }}
      />
    ),
  }
);
