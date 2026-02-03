import React from "react";
import figma from "@figma/code-connect";
import GiftCardsTile from "./GiftCardsTile";

figma.connect(
  GiftCardsTile,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=130-15846",
  {
    props: {
      children: figma.children("iconContainerBrand"),
      title: figma.string("title"),
      secondaryText: figma.string("secondaryText"),
    },
    example: ({ children, title, secondaryText }) => (
      <GiftCardsTile title={title} secondaryText={secondaryText}>
        {children}
      </GiftCardsTile>
    ),
  }
);
