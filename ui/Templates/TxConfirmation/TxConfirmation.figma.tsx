import figma from "@figma/code-connect";
import TxConfirmation from "./TxConfirmation";

figma.connect(
  TxConfirmation,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=117-11764",
  {
    props: {
      children: figma.children("*"),
      disclaimer: figma.boolean("hasDisclaimer", {
        true: figma.string("disclaimer"),
        false: undefined,
      }),
    },
    example: ({ children, disclaimer }) => (
      <TxConfirmation disclaimer={disclaimer}>{children}</TxConfirmation>
    ),
  }
);
