import React from "react";
import BankHomeSlot from "./BankHomeSlot";
import figma from "@figma/code-connect";

figma.connect(
  BankHomeSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=64-12731",
  {
    props: {},
    example: () => <BankHomeSlot />,
  }
);
