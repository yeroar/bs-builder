import React from "react"
import ValidationGroup from "./ValidationGroup"
import figma from "@figma/code-connect"

figma.connect(
  ValidationGroup,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=27-6343",
  {
    props: {
      children: figma.children(["success01", "success02", "success03", "danger01", "danger02", "danger03"]),
    },
    example: (props) => (
      <ValidationGroup>
        {props.children}
      </ValidationGroup>
    ),
  }
)
