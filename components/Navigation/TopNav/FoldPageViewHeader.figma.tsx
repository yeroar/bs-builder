import React from "react"
import FoldPageViewHeader from "./FoldPageViewHeader"
import figma from "@figma/code-connect"

const sharedProps = {
  rightComponent: figma.children(["RightStackControl"]),
  leftComponent: figma.children(["LeftStackControl"]),
}

const fullscreenProps = {
  ...sharedProps,
  title: figma.boolean("hasTitle", {
    true: figma.string("Title"),
    false: undefined,
  }),
  subTitle: figma.boolean("hasSubtitle", {
    true: figma.string("Subtitle"),
    false: undefined,
  }),
}

const progressiveProps = {
  ...sharedProps,
  step: figma.children("step"),
}

figma.connect(
  FoldPageViewHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=6-151&t=sKo2eAiZRSnzJgfo-4",
  {
    props: fullscreenProps,
    example: ({ title, subTitle, leftComponent, rightComponent }) => (
      <FoldPageViewHeader
        variant="fullscreen"
        title={title}
        subTitle={subTitle}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    ),
  },
)

figma.connect(
  FoldPageViewHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-774&t=sKo2eAiZRSnzJgfo-1",
  {
    props: sharedProps,
    example: ({ leftComponent, rightComponent }) => (
      <FoldPageViewHeader
        variant="root"
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    ),
  },
)

figma.connect(
  FoldPageViewHeader,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=8-202&t=sKo2eAiZRSnzJgfo-4",
  {
    props: progressiveProps,
    example: ({ step, leftComponent, rightComponent }) => (
      <FoldPageViewHeader
        variant="progressive"
        step={step}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
    ),
  },
)

