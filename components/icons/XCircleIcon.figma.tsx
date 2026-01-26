import React from "react"
import { XCircleIcon } from "./XCircleIcon"
import figma from "@figma/code-connect"

figma.connect(
  XCircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=23-1928",
  {
    props: {},
    example: () => <XCircleIcon />,
  }
)
