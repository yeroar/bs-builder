import React from "react";
import PlanSelector from "./PlanSelector";
import figma from "@figma/code-connect";

figma.connect(
  PlanSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-2016",
  {
    props: {
      plan: figma.string("plan"),
      description: figma.string("description"),
      isSelected: figma.boolean("isSelected"),
      chip: figma.children("chip"),
    },
    example: (props) => (
      <PlanSelector
        plan={props.plan}
        description={props.description}
        isSelected={props.isSelected}
        chip={props.chip}
        onPress={() => { }}
      />
    ),
  }
);
