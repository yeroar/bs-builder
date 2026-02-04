import React from "react"
import figma from "@figma/code-connect"
import PrimaryHeader from "../PrimaryHeader"

figma.connect(
  PrimaryHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=146-6467&t=4rZc6fXPGVHheUm9-4",
  {
    props: {
      noPaddings: figma.boolean("noPaddings"),

      iconSlot: figma.boolean("hasIconContainer", {
        true: figma.children("iconContainerBrand"),
        false: undefined,
      }),

      header: figma.textContent("Header"),
      body: figma.boolean("hasBodyText", {
        true: figma.textContent("Body"),
        false: undefined,
      }),

      validationChildren: figma.boolean("hasValidation", {
        true: figma.children("vaildationArray"),
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

      disclaimer: figma.boolean("hasDisclaimer", {
        true: figma.textContent("Disclaimer"),
        false: undefined,
      }),
    },
    example: ({ noPaddings, iconSlot, header, body, validationChildren, leadingSlot, trailingSlot, disclaimer }) => (
      <PrimaryHeader
        noPaddings={noPaddings}
        iconSlot={iconSlot}
        header={header}
        body={body}
        validationChildren={validationChildren}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
        disclaimer={disclaimer}
      />
    ),
  }
)
