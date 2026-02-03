import React from "react";
import Validation from "./Validation";
import figma from "@figma/code-connect";

figma.connect(
  Validation,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=27-4050",
  {
    props: {
      label: figma.string("label"),
      type: figma.enum("type", {
        danger: "danger",
        success: "success",
      }),
      leadingIcon: figma.children("leadingIcon"),
    },
    example: (props) => (
      <Validation
        label={props.label}
        type={props.type}
        leadingIcon={props.leadingIcon}
      />
    ),
  }
);
