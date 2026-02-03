import React from "react";
import ProgressVisualization from "./ProgressVisualization";
import figma from "@figma/code-connect";

figma.connect(
  ProgressVisualization,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-19703",
  {
    props: {
      leftText: figma.boolean("hasLeftText", {
        true: figma.string("leftText"),
        false: undefined,
      }),
      rightText: figma.boolean("hasRightText", {
        true: figma.string("rightText"),
        false: undefined,
      }),
      leadingSlot: figma.boolean("hasLeftTextIcon", {
        true: figma.instance("leftTextIcon"),
        false: undefined,
      }),
      trailingSlot: figma.boolean("hasRightTextIcon", {
        true: figma.instance("rightTextIcon"),
        false: undefined,
      }),
      progressBar: figma.children("progressBar"),
    },
    example: (props) => (
      <ProgressVisualization
        leftText={props.leftText}
        rightText={props.rightText}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
      >
        {props.progressBar}
      </ProgressVisualization>
    ),
  }
);
