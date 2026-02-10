import React from "react";
import BankHome from "./BankHome";
import figma from "@figma/code-connect";

figma.connect(
  BankHome,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=64-12731",
  {
    props: {},
    example: () => <BankHome />,
  }
);
