import React from "react";
import PriceChange from "./PriceChange";
import figma from "@figma/code-connect";

figma.connect(
  PriceChange,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=43-986",
  {
    props: {
      isPositive: figma.enum("priceChange", {
        positive: true,
        negative: false,
      }),
      label: figma.string("label"),
    },
    example: ({ isPositive, label }) => (
      <PriceChange label={label} isPositive={isPositive} />
    ),
  }
);
