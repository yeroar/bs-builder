import React from "react";
import LogoDebitIcon from "./LogoDebitIcon";
import figma from "@figma/code-connect";

figma.connect(
  LogoDebitIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=259-23924",
  {
    props: {
      state: figma.enum("state", {
        active: "active",
        disabled: "disabled",
      }),
    },
    example: (props) => <LogoDebitIcon {...props} />,
  }
);
