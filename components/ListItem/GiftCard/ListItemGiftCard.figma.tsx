import React from "react"
import ListItemGiftCard from "../../DataDisplay/ListItem/GiftCard/ListItemGiftCard"
import IconContainer from "../../Primitives/IconContainer/IconContainer"
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon"
import figma from "@figma/code-connect"

figma.connect(
  ListItemGiftCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9445",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("secondaryText"),
      tertiaryText: figma.string("tertiaryText"),
      leadingSlot: figma.instance("leadingSlot") as unknown as React.ReactNode,
      trailingSlot: figma.instance("trailingSlot") as unknown as React.ReactNode,
    },
    example: ({ title, secondaryText, tertiaryText, leadingSlot, trailingSlot }) => (
      <ListItemGiftCard
        title={title}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
      />
    ),
  }
)
