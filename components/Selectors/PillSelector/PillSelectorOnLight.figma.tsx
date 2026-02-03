import React from "react";
import PillSelector from "./PillSelector";
import figma from "@figma/code-connect";

figma.connect(
  PillSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-702",
  {
    props: {
      label: figma.string("label"),
      isActive: figma.enum("state", {
        Active: true,
        Default: false,
        Pressed: false,
      }),
      size: figma.enum("size", {
        md: "md",
        sm: "sm",
      }),
    },
    example: (props) => (
      <PillSelector
        label={props.label}
        isActive={props.isActive}
        variant="onLight"
        size={props.size}
        onPress={() => {}}
      />
    ),
  }
);
