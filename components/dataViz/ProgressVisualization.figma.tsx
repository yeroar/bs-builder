import React from "react";
import ProgressVisualization from "./ProgressVisualization";
import figma from "@figma/code-connect";

figma.connect(
  ProgressVisualization,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=29-19703",
  {
    props: {
      leftText: figma.string("leftText"),
      hasRightText: figma.boolean("hasRightText"),
      rightText: figma.string("rightText"),
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
        rightText={props.hasRightText ? props.rightText : undefined}
        leadingSlot={props.leadingSlot}
        trailingSlot={props.trailingSlot}
      >
        {props.progressBar}
      </ProgressVisualization>
    ),
  }
);
