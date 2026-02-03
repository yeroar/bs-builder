import React from "react";
import figma from "@figma/code-connect";
import QuickBuyInput from "./QuickBuyInput";

figma.connect(
  QuickBuyInput,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=108-9540",
  {
    props: {
      columns: figma.enum("buttonsNumber", {
        "2": 2,
        "3": 2,
        "4": 2,
        "5": 3,
        "6": 3,
        "7": 4,
        "8": 4,
      }),
    },
    example: ({ columns }) => (
      <QuickBuyInput
        amounts={[10, 20, 250, 500]}
        columns={columns}
        onAmountSelect={(amount) => console.log(amount)}
      />
    ),
  }
);
