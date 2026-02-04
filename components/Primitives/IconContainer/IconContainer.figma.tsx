import React from "react";
import figma from "@figma/code-connect";
import IconContainer from "./IconContainer";

figma.connect(
  IconContainer,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9703",
  {
    props: {
      variant: figma.enum("variant", {
        "default-fill": "default-fill",
        "default-stroke": "default-stroke",
        active: "active",
        error: "error",
        success: "success",
      }),
      size: figma.enum("size", {
        lrg: "lg",
        med: "md",
        sml: "sm",
      }),
      // @ts-expect-error - Code Connect instance type
      icon: figma.instance("icon"),
    },
    example: (props) => (
      <IconContainer
        variant={props.variant}
        size={props.size}
        icon={props.icon}
      />
    ),
  }
);
