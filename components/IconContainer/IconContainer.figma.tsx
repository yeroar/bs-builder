import React from "react";
import figma from "@figma/code-connect";
import IconContainer from "./IconContainer";

// IconContainerBrand mapping
figma.connect(
  IconContainer,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-13118",
  {
    props: {
      brand: figma.enum("brand", {
        chewy: "chewy",
        foldCash: "foldCash",
        uber: "uber",
      }),
    },
    example: ({ brand }) => <IconContainer brand={brand} size="lg" />,
  }
);
