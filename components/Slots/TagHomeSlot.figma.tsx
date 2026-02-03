import React from "react"
import TagHomeSlot from "./TagHomeSlot"
import figma from "@figma/code-connect"

figma.connect(
  TagHomeSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=73-8599&t=TzWViQO10QE76wsG-4",
  {
    props: {},
    example: () => (
      <TagHomeSlot
        onRedeemPress={() => console.log("Redeem pressed")}
        onSearchGiftCards={() => console.log("Search gift cards")}
        onGiftCardPress={(id) => console.log("Gift card pressed:", id)}
      />
    ),
  }
)
