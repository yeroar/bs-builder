import figma from "@figma/code-connect";
import EnterAmount from "./EnterAmount";

figma.connect(
  EnterAmount,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=119-13363",
  {
    props: {
      currencyInput: figma.children("currencyInput"),
      keypad: figma.children("Keypad"),
    },
    example: ({ currencyInput, keypad }) => (
      <EnterAmount>
        {currencyInput}
        {keypad}
      </EnterAmount>
    ),
  }
);
