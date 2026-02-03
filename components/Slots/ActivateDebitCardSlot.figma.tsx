import React from "react";
import ActivateDebitCardSlot from "./ActivateDebitCardSlot";
import figma from "@figma/code-connect";

figma.connect(
  ActivateDebitCardSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=54-12132",
  {
    example: () => <ActivateDebitCardSlot />,
  }
);
