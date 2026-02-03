import figma from "@figma/code-connect";
import CurrencyInput from "./CurrencyInput";

figma.connect(
  CurrencyInput,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-19078",
  {
    props: {
      value: figma.string("value"),
      topContext: figma.children("topContext"),
      bottomContext: figma.children("bottomContext"),
    },
    example: ({ value, topContext, bottomContext }) => (
      <CurrencyInput
        value={value}
        topContextSlot={topContext}
        bottomContextSlot={bottomContext}
      />
    ),
  }
);
