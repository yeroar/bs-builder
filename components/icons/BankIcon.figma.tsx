import React from "react"
import { BankIcon } from "./BankIcon"
import figma from "@figma/code-connect"

figma.connect(
  BankIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-12870",
  {
    props: {},
    example: () => <BankIcon />,
  }
)
