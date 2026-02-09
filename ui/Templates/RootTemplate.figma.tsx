import React from "react";
import figma from "@figma/code-connect";
import RootTemplate from "./RootTemplate";

figma.connect(
  RootTemplate,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=206-3799",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => (
      <RootTemplate
        variant="root"
        activeTab="left"
        onTabPress={(tab) => {}}
        onLeftPress={() => {}}
        scrollable
        homeSlot={props.children}
      />
    ),
  }
);
