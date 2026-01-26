import React from "react"
import { InfoCircleIcon } from "./InfoCircleIcon"
import figma from "@figma/code-connect"

figma.connect(
  InfoCircleIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=9-3770",
  {
    props: {},
    example: () => <InfoCircleIcon />,
  }
)
