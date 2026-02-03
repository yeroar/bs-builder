import React from "react"
import SearchBar from "./SearchBar"
import figma from "@figma/code-connect"

figma.connect(
  SearchBar,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=66-9157",
  {
    props: {
      placeholder: figma.string("placeholder"),
    },
    example: ({ placeholder }) => (
      <SearchBar
        placeholder={placeholder}
      />
    ),
  }
)
