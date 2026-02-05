import React from "react"
import TransactionList from "./TransactionList"
import figma from "@figma/code-connect"

figma.connect(
  TransactionList,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=50-17184",
  {
    props: {},
    example: () => (
      <TransactionList />
    ),
  },
)
