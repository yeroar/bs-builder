import React from "react"
import TextContainer from "./TextContainer"
import figma from "@figma/code-connect"

figma.connect(
  TextContainer,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=9-3819",
  {
    props: {
      state: figma.enum("state", {
        empty: "empty",
        focused: "focused",
        typing: "typing",
        filled: "filled",
        error: "error",
      }),
      trailingSlot: figma.boolean("trailingIcon", {
           true: figma.instance("trailingSlot"),
        false: undefined,
      }),
      leadingSlot: figma.boolean("hasChip", {
        true: figma.children(["chip"]),
        false: undefined,
      }),
      placeholderText: figma.string("placeholderText"),
    },
    example: (props) => (
      <TextContainer 
        state={props.state}
        leadingSlot={props.leadingSlot}
        placeholder={props.placeholderText}
        trailingSlot={props.trailingSlot}
      />
    ),
  }
)
