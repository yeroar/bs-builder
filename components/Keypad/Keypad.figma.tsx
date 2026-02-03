import figma from "@figma/code-connect";
import Keypad from "./Keypad";

figma.connect(
  Keypad,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18347",
  {
    props: {
      button: figma.children("button01"),
    },
    example: ({ button }) => (
      <Keypad>{button}</Keypad>
    ),
  }
);
