import React from "react";
import ProgressBar from "./ProgressBar";
import figma from "@figma/code-connect";

figma.connect(
  ProgressBar,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-21863&m=dev",
  {
    props: {
      progress: figma.enum("progress", {
        "0": 0,

        "100": 100,
      }),
    },
    example: (props) => <ProgressBar progress={props.progress} />,
  }
);
