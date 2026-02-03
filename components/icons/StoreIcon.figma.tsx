import React from "react"
import { StoreIcon } from "./StoreIcon"
import figma from "@figma/code-connect"

figma.connect(
  StoreIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-12932",
  {
    props: {},
    example: (props) => <StoreIcon {...props} />,
  },
)
