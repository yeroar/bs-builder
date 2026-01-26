import React from "react"
import LogoContainer from "./LogoContainer"
import figma from "@figma/code-connect"

figma.connect(
  LogoContainer,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-13118",
  {
    props: {
        brand: figma.string("brand"),
    },
    example: (props) => <LogoContainer brand={props.brand} />,
  }
)
