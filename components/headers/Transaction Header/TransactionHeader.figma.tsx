import React from "react"
import TransactionHeader from "./TransactionHeader"
import figma from "@figma/code-connect"

figma.connect(
  TransactionHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=27-8654",
  {
    props: {
      title: figma.string("title"),
      subheader: figma.boolean("hasSubheader", {
        true: figma.string("subheader"),
        false: undefined,
      }),
      footnote: figma.boolean("hasFootnote", {
        true: figma.string("footnote"),
        false: undefined,
      }),
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasTrailingSlot", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: (props) => (
      <TransactionHeader
        title={props.title}
        subheader={props.subheader}
        footnote={props.footnote}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
      />
    ),
  }
)

figma.connect(
  TransactionHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=28-9879",
  {
    props: {
      title: figma.string("title"),
      subheader: figma.boolean("hasSubheader", {
        true: figma.string("subheader"),
        false: undefined,
      }),
      footnote: figma.boolean("hasFootnote", {
        true: figma.string("footnote"),
        false: undefined,
      }),
      leadingSlot: figma.boolean("hasLeadingSlot", {
        true: figma.instance("leadingSlot"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasTrailingSlot", {
        true: figma.instance("trailingSlot"),
        false: undefined,
      }),
    },
    example: (props) => (
      <TransactionHeader
        title={props.title}
        subheader={props.subheader}
        footnote={props.footnote}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
      />
    ),
  }
)
