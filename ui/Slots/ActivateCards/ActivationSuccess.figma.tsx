import React from "react";
import ActivationSuccess from "./ActivationSuccess";
import figma from "@figma/code-connect";

figma.connect(
  ActivationSuccess,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=65-10526",
  {
    example: () => <ActivationSuccess />,
  }
);
