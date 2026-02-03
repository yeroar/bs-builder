import React from "react";
import ListItem from "./ListItem";
import figma from "@figma/code-connect";

figma.connect(
  ListItem,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-11752",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("timestamp"),
      leadingSlot: figma.children("leadingSlot"),
    },
    example: (props) => (
      <ListItem
        variant="notifications"
        title={props.title}
        secondaryText={props.secondaryText}
        leadingSlot={props.leadingSlot}
        onPress={() => { }}
      />
    ),
  }
);
