import React from "react";
import PmSelector from "./PmSelector";
import figma from "@figma/code-connect";

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
    example: ({ variant }) => <PmSelector variant={variant} onPress={() => {}} />,
  }
);
