import React from "react"
import Chip from "./Chip"
import figma from "@figma/code-connect"

figma.connect(
  Chip,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=9-3773",
  {
    props: {
      label: figma.string("label"),
      type: figma.enum("type", {
        primary: "primary",
        accent: "accent",
        success: "success",
      }),
      bold: figma.boolean("bold"),
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: ({ label, type, bold, leadingSlot, trailingSlot }) => (
      <Chip
        label={label}
        type={type}
        bold={bold}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
        onPress={() => { }}
      />
    ),
  }
)
