import React from "react"
import PrimaryHeader from "./PrimaryHeader"
import figma from "@figma/code-connect"

figma.connect(
  PrimaryHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=23-1869",
  {
    props: {
      header: figma.string("header"),
      body: figma.boolean("hasBodyText", {
        true: figma.string("body"),
        false: undefined,
      }),
      disclaimer: figma.boolean("hasDisclaimer", {
        true: figma.string("disclaimer"),
        false: undefined,
      }),
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasTrailingSlot", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
      validationChildren: figma.boolean("hasValidation", {
        true: figma.children("vaildationArray"),
        false: undefined,
      }),
    },
    example: (props) => (
      <PrimaryHeader
        header={props.header}
        body={props.body}
        disclaimer={props.disclaimer}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
        validationChildren={props.validationChildren}
      />
    ),
  }
)
