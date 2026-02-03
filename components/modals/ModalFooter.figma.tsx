import React from "react";
import ModalFooter from "./ModalFooter";
import Button from "../Buttons/Button/Button";
import figma from "@figma/code-connect";

figma.connect(
  ModalFooter,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-14642",
  {
    props: {
      disclaimer: figma.boolean("hasDisclaimer", {
        true: figma.string("disclaimer"),
        false: undefined,
      }),
      variant: figma.enum("type", {
        default: "default",
        dulaButton: "dulaButton",
      }),
      primaryButton: figma.children("button01"),
      secondaryButton: figma.children("button02"),

    },
    example: (props) => (
      <ModalFooter
        variant={props.variant}
        disclaimer={props.disclaimer}
        primaryButton={props.primaryButton}
        secondaryButton={props.secondaryButton}
      />
    ),
  }
);
