import React from "react"
import { SearchMdIcon } from "./SearchMdIcon"
import figma from "@figma/code-connect"

figma.connect(
  SearchMdIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=66-9224",
  {
    props: {},
    example: () => <SearchMdIcon />,
  }
)
