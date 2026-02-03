import figma from "@figma/code-connect";
import KeypadButton from "./KeypadButton";

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
    example: ({ type }) => <KeypadButton type={type} value="1" />,
  }
);
