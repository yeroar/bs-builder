import React from "react";
import ChoosePaymentMethodFoldSlot from "./ChoosePaymentMethodFoldSlot";
import figma from "@figma/code-connect";

figma.connect(
  ChoosePaymentMethodFoldSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20811",
  {
    example: () => (
      <ChoosePaymentMethodFoldSlot
        cashBalance="$500.00"
        cashBalanceSats="nn sats"
        creditCardLastFour="0823"
        onSelectOption={() => { }}
      />
    ),
  }
);
