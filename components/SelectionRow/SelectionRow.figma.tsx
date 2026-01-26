import React from "react";
import SelectionRow from "./SelectionRow";
import figma from "@figma/code-connect";

figma.connect(
  SelectionRow,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-21877",
  {
    props: {
      checked: figma.boolean("Checked"),
      children: figma.children("*"),
    },
    example: (props) => (
      <SelectionRow
        checked={props.checked}
        onPress={() => { }}
      >
        {props.children}
      </SelectionRow>
    ),
  }
);
