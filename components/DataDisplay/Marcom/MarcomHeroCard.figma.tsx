import React from "react"
import MarcomHeroCard from "./MarcomHeroCard"
import Button from "../../Primitives/Buttons/Button/Button"
import figma from "@figma/code-connect"

figma.connect(
  MarcomHeroCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=66-11043",
  {
    props: {
      variant: figma.enum("variant", {
        "generic": "generic",
        "gift card": "gift-card",
      }),
      title: figma.string("title"),
      subtitle: figma.enum("variant", {
        "generic": figma.string("subtitle"),
        "gift card": undefined,
      }),
      button: figma.enum("variant", {
        "generic": undefined,
        "gift card": figma.children("button"),
      }),
    },
    example: ({ variant, title, subtitle, button }) => (
      <MarcomHeroCard
        variant={variant}
        title={title}
        subtitle={subtitle}
        button={button}
      />
    ),
  }
)
