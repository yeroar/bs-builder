import React from "react";
import figma from "@figma/code-connect";
import AutomationSuccessSlot from "./AutomationSuccessSlot";

figma.connect(
  AutomationSuccessSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=157-16988",
  {
    props: {
      primaryHeader: figma.nestedProps("primaryHeader", {
        header: figma.textContent("Header"),
        body: figma.textContent("Body"),
      }),
    },
    example: (props) => (
      <AutomationSuccessSlot
        header={props.primaryHeader.header}
        body={props.primaryHeader.body}
      />
    ),
  }
);
