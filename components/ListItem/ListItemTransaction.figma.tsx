import React from "react";
import ListItemTransaction from "./ListItemTransaction";
import figma from "@figma/code-connect";

// ListItemReceipt - node-id=20-9557
figma.connect(
  ListItemTransaction,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9557",
  {
    props: {
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      leftColumn: figma.children("leftColumn"),
      rightColumn: figma.children(" rightColumn"),
      showDivider: figma.boolean("show div"),
    },
    example: (props) => (
      <ListItemTransaction
        leadingSlot={props.leadingSlot}
        leftColumn={props.leftColumn}
        rightColumn={props.rightColumn}
        showDivider={props.showDivider}
        onPress={() => { }}
      />
    ),
  }
);

// ListItemTransaction - node-id=20-9586
figma.connect(
  ListItemTransaction,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9586",
  {
    props: {
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      leftColumn: figma.children("leftColumn"),
      rightColumn: figma.children(" rightColumn"),
    },
    example: (props) => (
      <ListItemTransaction
        leadingSlot={props.leadingSlot}
        leftColumn={props.leftColumn}
        rightColumn={props.rightColumn}
        onPress={() => { }}
      />
    ),
  }
);
