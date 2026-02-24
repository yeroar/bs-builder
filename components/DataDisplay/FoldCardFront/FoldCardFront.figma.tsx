import React from "react";
import figma from "@figma/code-connect";
import FoldCardFront from "./FoldCardFront";

figma.connect(
  FoldCardFront,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=259-23937",
  {
    props: {
      state: figma.enum("state", {
        active: "active",
        ordered: "ordered",
      }),
    },
    example: (props) => <FoldCardFront state={props.state} />,
  }
);
