import React from "react"
import ListItemGiftCard from "./ListItemGiftCard"
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
      boosted: figma.boolean("isBoosted"),
      favorite: figma.boolean("isFavorite"),
    },
    example: (props) => (
      <ListItemGiftCard
        title={props.title}
        secondaryText={props.secondaryText}
        tertiaryText={props.tertiaryText}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
        boosted={props.boosted}
        favorite={props.favorite}
      />
    ),
  }
)
