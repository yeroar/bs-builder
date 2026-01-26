import React from "react"
import { BellIcon } from "./BellIcon"
import figma from "@figma/code-connect"

figma.connect(
  BellIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-757&t=kVKzATbYBdqXXugQ-4",
  {
    props: {},
    example: (props) => <BellIcon {...props} />,
  },
)
