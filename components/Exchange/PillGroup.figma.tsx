import React from "react";
import PillGroup from "./PillGroup";
import figma from "@figma/code-connect";

figma.connect(
  PillGroup,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=43-2629",
  {
    props: {
      active: figma.enum("active", {
        "01": "24H",
        "02": "1W",
        "03": "1M",
        "04": "1Y",
        "05": "ALL",
      }),
    },
    example: ({ active }) => <PillGroup active={active} variant="onBrand" />,
  }
);
