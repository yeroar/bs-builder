import React from "react";
import BtcPrice from "./BtcPrice";
import figma from "@figma/code-connect";

figma.connect(
  BtcPrice,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=41-1629",
  {
    props: {
      label: figma.string("label"),
      price: figma.string("price"),
      timePeriod: figma.string("timePeriod"),
      priceChange: figma.children("priceChange"),
    },
    example: (props) => (
      <BtcPrice
        price={props.price}
        timePeriod={props.timePeriod}
        label={props.label}
        priceChange={props.priceChange}
      />
    ),
  }
);
