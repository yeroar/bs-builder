import React from "react";
import ProductSurfaceRewards from "./ProductSurfaceRewards";
import figma from "@figma/code-connect";

figma.connect(
  ProductSurfaceRewards,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=30-4481",
  {
    props: {
      amount: figma.string("amount"),
      action: figma.enum("progress", {
        "100": figma.children("leadingElement"),
        "0": false,
      }),
      children: figma.children("dataViz"),
    },
    example: (props) => (
      <ProductSurfaceRewards
        amount={props.amount}
        action={props.action}
      >
        {props.children}
      </ProductSurfaceRewards>
    ),
  }
);
