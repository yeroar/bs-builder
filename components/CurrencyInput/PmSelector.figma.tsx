import figma from "@figma/code-connect";
import PmSelector from "./PmSelector";

figma.connect(
  PmSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18789",
  {
    props: {
      variant: figma.enum("variant", {
        null: "null",
        bankAccount: "bankAccount",
        cardAccount: "cardAccount",
        foldAccount: "foldAccount",
        bitcoinAccount: "bitcoinAccount",
      }),
    },
    example: ({ variant }) => <PmSelector variant={variant} />,
  }
);
