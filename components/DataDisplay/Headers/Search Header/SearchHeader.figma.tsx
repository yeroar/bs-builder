import React from "react"
import SearchHeader from "./SearchHeader"
import figma from "@figma/code-connect"

figma.connect(
  SearchHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-17154",
  {
    props: {},
    example: () => (
      <SearchHeader
        title="Header"
        actionLabel="textButton"
        onActionPress={() => { }}
      />
    ),
  }
)
