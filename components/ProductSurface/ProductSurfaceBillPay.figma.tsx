import React from "react";
import ProductSurfaceBillPay from "./ProductSurfaceBillPay";
import figma from "@figma/code-connect";

figma.connect(
  ProductSurfaceBillPay,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=30-2260",
  {
    props: {
      month: figma.string("month"),
      amount: figma.string("amount"),
      chip: figma.children("chip"),
      progressViz: figma.children("progress"),
    },
    example: (props) => (
      <ProductSurfaceBillPay
        month={props.month}
        amount={props.amount}
        chip={props.chip}
      >
        {props.progressViz}
      </ProductSurfaceBillPay>
    ),
  }
);
