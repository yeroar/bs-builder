import React from "react"
import TextField from "./TextField"
import figma from "@figma/code-connect"

figma.connect(
  TextField,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=111-10945&t=lTYgf58yy7OIKM6M-4",
  {
    props: {
      label: figma.boolean("hasLabel", {
        true: figma.string("label"),
        false: undefined,
      }),
      // Flatten TextContainer props onto TextField
      textContainerProps: figma.nestedProps("textContainer", {
        state: figma.enum("state", {
          empty: "empty",
          focused: "focused",
          typing: "typing",
          filled: "filled",
          error: "error",
        }),
        placeholder: figma.string("placeholderText"),
        trailingSlot: figma.boolean("trailingIcon", {
          true: figma.instance("trailingSlot"),
          false: undefined,
        }),
        leadingSlot: figma.boolean("hasChip", {
          true: figma.children(["chip"]),
          false: undefined,
        }),
      }),
      footer: figma.boolean("hasFootnote", {
        true: figma.children("footerComponent"),
        false: undefined,
      }),
    },
    example: (props) => (
      <TextField
        label={props.label}
        state={props.textContainerProps.state}
        placeholder={props.textContainerProps.placeholder}
        leadingSlot={props.textContainerProps.leadingSlot}
        trailingSlot={props.textContainerProps.trailingSlot}
        footer={props.footer}
      />
    ),
  }
)
