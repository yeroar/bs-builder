import React from "react"
import { AlertCircleIcon } from "./AlertCircleIcon"
import figma from "@figma/code-connect"

figma.connect(
  AlertCircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=22-1644",
  {
    props: {},
    example: () => <AlertCircleIcon />,
  }
)
