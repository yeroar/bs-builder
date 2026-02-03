import React from "react";
import ListItemReceipt from "./ListItemReceipt";
import figma from "@figma/code-connect";

figma.connect(
  ListItemReceipt,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=99-12795&t=ZAj1RhjHPnO3x8Ov-4",
  {
    props: {
      label: figma.string("label"),
      value: figma.string("value"),
      denominator: figma.boolean("hasDenominator", {
        true: figma.string("denominator"),
        false: undefined,
      }),
    },
    example: (props) => (
      <ListItemReceipt
        label={props.label}
        value={props.value}
        denominator={props.denominator}
      />
    ),
  }
);
