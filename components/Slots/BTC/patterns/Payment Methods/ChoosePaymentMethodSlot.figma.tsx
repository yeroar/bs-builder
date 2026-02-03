import React from "react";
import ChoosePaymentMethodSlot from "./ChoosePaymentMethodSlot";
import figma from "@figma/code-connect";

figma.connect(
  ChoosePaymentMethodSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20812",
  {
    example: () => (
      <ChoosePaymentMethodSlot
        cashBalance="$500.00"
        bankName="Wells Fargo"
        bankLastFour="0823"
        onSelectCashBalance={() => { }}
        onSelectBankAccount={() => { }}
        onAddBankAccount={() => { }}
      />
    ),
  }
);
