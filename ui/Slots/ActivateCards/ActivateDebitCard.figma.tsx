import React from "react";
import ActivateDebitCard from "./ActivateDebitCard";
import figma from "@figma/code-connect";

figma.connect(
  ActivateDebitCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=54-12132",
  {
    example: () => <ActivateDebitCard />,
  }
);
