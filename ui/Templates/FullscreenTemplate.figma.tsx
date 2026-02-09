import React from "react";
import figma from "@figma/code-connect";
import FullscreenTemplate from "./FullscreenTemplate";

// Fullscreen / Start (X close)
figma.connect(
  FullscreenTemplate,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=206-407",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => (
      <FullscreenTemplate
        navVariant="start"
        leftIcon="x"
        onLeftPress={() => {}}
      >
        {props.children}
      </FullscreenTemplate>
    ),
  }
);

// Fullscreen / Step (chevron back)
figma.connect(
  FullscreenTemplate,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=209-16491",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => (
      <FullscreenTemplate
        navVariant="step"
        leftIcon="chevron-left"
        onLeftPress={() => {}}
      >
        {props.children}
      </FullscreenTemplate>
    ),
  }
);
