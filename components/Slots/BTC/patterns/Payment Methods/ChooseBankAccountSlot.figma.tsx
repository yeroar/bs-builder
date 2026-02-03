import React from "react";
import ChooseBankAccountSlot from "./Payment Methods/ChooseBankAccountSlot";
import figma from "@figma/code-connect";

figma.connect(
  ChooseBankAccountSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20810",
  {
    example: () => (
      <ChooseBankAccountSlot
        bankAccounts={[
          { id: "1", name: "Wells Fargo", lastFour: "0823" },
          { id: "2", name: "Chase", lastFour: "1234" },
        ]}
        onSelectAccount={() => { }}
        onAddBankAccount={() => { }}
      />
    ),
  }
);
