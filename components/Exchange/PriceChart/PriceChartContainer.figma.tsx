import React from "react"
import { PriceChartContainer } from "./PriceChartContainer"
import figma from "@figma/code-connect"

figma.connect(
  PriceChartContainer,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=46-13928",
  {
    props: {},
    example: () => (
      <PriceChartContainer />
    ),
  },
)
