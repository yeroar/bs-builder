import React from "react"
import { CheckCircleIcon } from "./CheckCircleIcon"
import figma from "@figma/code-connect"

figma.connect(
  CheckCircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=22-1643",
  {
    props: {},
    example: () => <CheckCircleIcon />,
  }
)
