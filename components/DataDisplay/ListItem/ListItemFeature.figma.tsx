import React from "react";
import ListItem from "./ListItem";
import { IconContainer } from "../../Primitives/IconContainer";
import InfoCircleIcon from "../../Icons/InfoCircleIcon";
import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import figma from "@figma/code-connect";

figma.connect(
  ListItem,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-6870",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.boolean("hasDescription", {
        true: figma.string("description"),
        false: undefined,
      }),
      isActive: figma.boolean("isActive"),
      hasDiv: figma.boolean("hasDiv"),
      leadingSlot: figma.children("leftSlot"),
      trailingSlot: figma.children("rightIcon"),
      chip: figma.boolean("hasChip", {
        true: figma.children("chip"),
        false: undefined,
      }),
      // size: figma.enum("size", { med: "med", sml: "sml", lrg: "lrg" }),
    },
    example: (props) => (
      <ListItem
        variant="feature"
        title={props.title}
        secondaryText={props.secondaryText}
        showDivider={props.hasDiv}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
        chip={props.chip}
        onPress={() => { }}
      />
    ),
  }
);
