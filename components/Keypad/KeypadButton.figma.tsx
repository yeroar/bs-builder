import React from "react";
import KeypadButton from "./KeypadButton";
import figma from "@figma/code-connect";

figma.connect(
  KeypadButton,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18341",
  {
    props: {
      type: figma.enum("Type", {
        Number: "number",
        Icon: "icon",
      }),
    },
    example: ({ type }) => (
      <KeypadButton type={type} value="1" onPress={() => {}} />
    ),
  }
);
