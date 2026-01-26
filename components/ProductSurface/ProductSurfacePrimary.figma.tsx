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
      progressViz: figma.children("progressViz"),
      primaryButton: figma.boolean("hasPrimaryButton", {
        true: figma.instance("primaryButton"),
        false: undefined,
      }),
      secondaryButton: figma.boolean("hasSecondaryButton", {
        true: figma.instance("secondaryButton"),
        false: undefined,
      }),
      tertiaryButton: figma.boolean("hasTertiaryButton", {
        true: figma.instance("tertiaryButton"),
        false: undefined,
      }),
    },
    example: (props) => (
      <ProductSurfacePrimary
        variant={props.variant}
        label={props.label}
        amount={props.amount}
        progressViz={props.progressViz}
        primaryButton={props.primaryButton}
        secondaryButton={props.secondaryButton}
        tertiaryButton={props.tertiaryButton}
      />
    ),
  }
);
