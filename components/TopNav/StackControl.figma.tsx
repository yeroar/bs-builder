import React from "react"
import StackControl from "./StackControl"
import figma from "@figma/code-connect"

figma.connect(
  StackControl,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=6-46&t=sKo2eAiZRSnzJgfo-4",
  {
    props: {
      variant: figma.enum("variant", {
        left: "left",
        right: "right",
      }),
      // map instances into the slot props via booleans
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: ({ variant, leadingSlot, trailingSlot }) => (
      <StackControl
        variant={variant}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
      />
    ),
  },
)
