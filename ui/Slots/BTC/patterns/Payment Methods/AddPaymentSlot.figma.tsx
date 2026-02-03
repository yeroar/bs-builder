import React from "react";
import AddPaymentSlot from "./AddPaymentSlot";
import figma from "@figma/code-connect";

figma.connect(
  AddPaymentSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-21107",
  {
    example: () => (
      <AddPaymentSlot
        onBankAccountPress={() => {}}
        onDebitCardPress={() => {}}
      />
    ),
  }
);
