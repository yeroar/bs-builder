import React from "react";
import Button from "./Button";
import figma from "@figma/code-connect";

figma.connect(
  Button,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=13-907",
  {
    props: {
      label: figma.string("label"),
      hierarchy: figma.enum("hierarchy", {
        primary: "primary",
        secondary: "secondary",
        tertiary: "tertiary",
        inverse: "inverse",
        destructive: "destructive",
      }),
      size: figma.enum("size", {
        lg: "lg",
        md: "md",
        sm: "sm",
        xs: "xs",
      }),
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
      disabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: ({ hierarchy, label, size, disabled, leadingSlot, trailingSlot }) => (
      <Button
        hierarchy={hierarchy}
        label={label}
        size={size}
        disabled={disabled}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
      />
    ),
  }
);
