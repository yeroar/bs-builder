import React from "react";
import Toast from "./Toast";
import figma from "@figma/code-connect";

figma.connect(
  Toast,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-6548",
  {
    props: {
      message: figma.string("message"),
      type: figma.enum("type", {
        Info: "info",
        Success: "success",
        Error: "error",
      }),
      showIcon: figma.boolean("leadingIcon"),
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
    },
    example: (props) => (
      <Toast
        message={props.message}
        type={props.type}
        showIcon={props.showIcon}
        leadingSlot={props.leadingSlot}
      />
    ),
  }
);
