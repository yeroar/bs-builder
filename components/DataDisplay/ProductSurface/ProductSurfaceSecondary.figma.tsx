import React from "react";
import ProductSurfaceSecondary from "./ProductSurfaceSecondary";
import figma from "@figma/code-connect";

figma.connect(
  ProductSurfaceSecondary,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=30-4482",
  {
    props: {
      label: figma.string("label"),
      amount: figma.string("amount"),
      hasTitleIcon: figma.boolean("hasTitleIcon"),
      dataViz: figma.boolean("hasDataViz", {
        true: figma.children("dataViz"),
        false: undefined,
      }),
      actionBar: figma.children("actionBar"),
    },
    example: (props) => (
      <ProductSurfaceSecondary
        label={props.label}
        amount={props.amount}
        hasTitleIcon={props.hasTitleIcon}
        dataViz={props.dataViz}
        actionBar={props.actionBar}
      />
    ),
  }
);
