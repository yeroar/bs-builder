import React from "react";
import DropDown from "./DropDown";
import figma from "@figma/code-connect";

figma.connect(
  DropDown,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=69-8640",
  {
    props: {
      label: figma.string("label"),
      variant: figma.enum("variant", {
        default: "default",
        pressed: "default",
        active: "active",
      }),
    },
    example: ({ label, variant }) => (
      <DropDown label={label} variant={variant} onPress={() => { }} />
    ),
  }
);
