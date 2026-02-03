import React from "react";
import ProductSurfacePrimary from "./ProductSurfacePrimary";
import figma from "@figma/code-connect";

figma.connect(
  ProductSurfacePrimary,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-19604",
  {
    props: {
      variant: figma.enum("variant", {
        expanded: "expanded",
        condensed: "condensed",
      }),
      label: figma.string("label"),
      amount: figma.string("amount"),
      hasLabelIcon: figma.boolean("hasLabelIcon"),
      swapCurrency: figma.boolean("swapCurrency"),
      progressViz: figma.boolean("hasDataViz", {
        true: figma.children("progressViz"),
        false: undefined,
      }),
      primaryButton: figma.boolean("hasPrimaryButton", {
        true: figma.children("button01"),
        false: undefined,
      }),
      secondaryButton: figma.boolean("hasSecondaryButton", {
        true: figma.children("button02"),
        false: undefined,
      }),
      tertiaryButton: figma.boolean("hasTertiaryButton", {
        true: figma.children("button03"),
        false: undefined,
      }),
      messageSlot: figma.boolean("hasMarcomTile", {
        true: figma.children("marcomProduct tile"),
        false: undefined,
      }),
    },
    example: (props) => (
      <ProductSurfacePrimary
        variant={props.variant}
        label={props.label}
        amount={props.amount}
        hasLabelIcon={props.hasLabelIcon}
        swapCurrency={props.swapCurrency}
        progressViz={props.progressViz}
        primaryButton={props.primaryButton}
        secondaryButton={props.secondaryButton}
        tertiaryButton={props.tertiaryButton}
        messageSlot={props.messageSlot}
      />
    ),
  }
);
