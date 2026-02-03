import React from "react";
import figma from "@figma/code-connect";
import GCRedemptionMethodSlot from "./GCRedemptionMethodSlot";

figma.connect(
  GCRedemptionMethodSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=105-9911",
  {
    example: () => (
      <GCRedemptionMethodSlot
        selectedMethod={null}
        onMethodSelect={(method) => console.log("Selected:", method)}
      />
    ),
  }
);
