import React from "react"
import SecondaryHeader from "./SecondaryHeader"
import figma from "@figma/code-connect"

figma.connect(
  SecondaryHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-15991",
  {
    props: {
      title: figma.string("title"),
      body: figma.string("body"),
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasTrailingSlot", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
      disclaimer: figma.string("disclaimer"),
    },
    example: (props) => (
      <SecondaryHeader
        title={props.title}
        body={props.body}
        disclaimer={props.disclaimer}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
      />
    ),
  }
)
