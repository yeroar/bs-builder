import React from "react";
import RemoveModalSlot from "./RemoveModalSlot";
import figma from "@figma/code-connect";

figma.connect(
  RemoveModalSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=158-45370&t=MBgGpdxPfYQe9lUU-4",
  {
    props: {
      icon: figma.children("IconContainers"),
      title: figma.textContent("Title"),
      body: figma.textContent("Body"),
    },
    example: (props) => (
      <RemoveModalSlot
        icon={props.icon}
        title={props.title}
        body={props.body}
      />
    ),
  }
);
