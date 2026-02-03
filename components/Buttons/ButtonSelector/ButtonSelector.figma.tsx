import React from "react";
import ButtonSelector from "./ButtonSelector";
import figma from "@figma/code-connect";

figma.connect(
  ButtonSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=31-529",
  {
    props: {
      label: figma.string("label"),
      isSelected: figma.boolean("isSelected"),
    },
    example: (props) => (
      <ButtonSelector
        label={props.label}
        isSelected={props.isSelected}
        onPress={() => {}}
      />
    ),
  }
);
