import React from "react";
import ActivationSuccessSlot from "./ActivationSuccessSlot";
import figma from "@figma/code-connect";

figma.connect(
  ActivationSuccessSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=65-10526",
  {
    example: () => <ActivationSuccessSlot />,
  }
);
