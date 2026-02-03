import React from "react";
import ExchangeButton from "./ExchangeButton";
import figma from "@figma/code-connect";

figma.connect(
  ExchangeButton,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=41-1622",
  {
    props: {
      label: figma.string("label"),
    },
    example: (props) => (
      <ExchangeButton
        label={props.label}
        onPress={() => {}}
      />
    ),
  }
);
