import React from "react";
import ListItem from "../ListItem";
import figma from "@figma/code-connect";

// ListItemReceipt - node-id=20-9557
figma.connect(
  ListItem,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9557",
  {
    props: {
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      showDivider: figma.boolean("show div"),
    },
    example: (props) => (
      <ListItem
        variant="receipt"
        leadingSlot={props.leadingSlot}
        title="Title"
        secondaryText="Description"
        rightTitle="Amount"
        rightSecondaryText="Status"
        showDivider={props.showDivider}
        onPress={() => { }}
      />
    ),
  }
);

// ListItemTransaction - node-id=20-9586
figma.connect(
  ListItem,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9586",
  {
    props: {
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
    },
    example: (props) => (
      <ListItem
        variant="transaction"
        leadingSlot={props.leadingSlot}
        title="Transaction Title"
        secondaryText="Subtitle"
        rightTitle="Amount"
        rightSecondaryText="Date"
        onPress={() => { }}
      />
    ),
  }
);
