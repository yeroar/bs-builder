import React from "react";
import ListItem from "./ListItem";
import figma from "@figma/code-connect";

// Maps Figma "ListItemGiftCard" to unified ListItem component
figma.connect(
  ListItem,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9445",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("secondaryText"),
      tertiaryText: figma.string("tertiaryText"),
      leadingSlot: figma.children("leadingSlot"),
      trailingSlot: figma.boolean("trailingIcon", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
      chip: figma.boolean("titleChip", {
        true: figma.children("titleChip"),
        false: undefined,
      }),
      showDivider: figma.boolean("showDiv"),
    },
    example: (props) => (
      <ListItem
        variant="giftCard"
        title={props.title}
        secondaryText={props.secondaryText}
        tertiaryText={props.tertiaryText}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
        chip={props.chip}
        showDivider={props.showDivider}
        onPress={() => {}}
      />
    ),
  }
);
