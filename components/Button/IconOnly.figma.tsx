import React from "react";
import IconOnly from "./IconOnly";
import figma from "@figma/code-connect";

figma.connect(
  IconOnly,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=13-4656",
  {
    props: {
      hierarchy: figma.enum("hierarchy", {
        primary: "primary",
        secondary: "secondary",
        tertiary: "tertiary",
      }),
      size: figma.enum("size", {
        lg: "lg",
        md: "md",
        sm: "sm",
        xs: "xs",
      }),
      disabled: figma.enum("state", {
        disabled: true,
      }),
      icon: figma.instance("icon"),
    },
    example: (props) => (
      <IconOnly
        hierarchy={props.hierarchy}
        size={props.size}
        disabled={props.disabled}
        icon={props.icon}
      />
    ),
  }
);
