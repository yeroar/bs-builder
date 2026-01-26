import React from "react"
import Footnote from "./Footnote"
import figma from "@figma/code-connect"

figma.connect(
  Footnote,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=9-3692",
  {
    props: {
      type: figma.enum("type", {
        error: "error",
        info: "info",
      }),
      message: figma.string("message"),
      leadingSlot: figma.boolean("leadingIcon", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: (props) => (
      <Footnote 
        type={props.type} 
        message={props.message} 
        leadingSlot={props.leadingSlot} 
        trailingSlot={props.trailingSlot} 
        onPress={() => {}}
      />
    ),
  }
)
