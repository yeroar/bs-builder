import React from "react"
import figma from "@figma/code-connect"
import PrimaryHeader from "../PrimaryHeader"

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
      leadingSlot: figma.boolean("hasActionBar", {
        true: figma.instance("leadingAction"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasSecondaryButton", {
        true: figma.instance("secondaryButton"),
        false: undefined,
      }),
      validationChildren: figma.boolean("hasValidation", {
        true: figma.children("vaildationArray"),
        false: undefined,
      }),
      iconSlot: figma.boolean("hasIconContainer", {
        true: figma.children("iconContainerBrand"),
        false: undefined,
      }),
    },
    example: (props) => (
      <PrimaryHeader
        header={props.header}
        body={props.body}
        iconSlot={props.iconSlot}
        validationChildren={props.validationChildren}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
        disclaimer={props.disclaimer}
      />
    ),
  }
)
