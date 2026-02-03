import figma from "@figma/code-connect";
import TxConfirmation from "./TxConfirmation";

// Gift card confirmation template
figma.connect(
  TxConfirmation,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=117-11764",
  {
    props: {
      children: figma.children("*"),
    },
    example: ({ children }) => (
      <TxConfirmation>
        {children}
      </TxConfirmation>
    ),
  }
);
