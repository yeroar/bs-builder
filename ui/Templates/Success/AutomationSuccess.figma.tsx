import React from "react";
import figma from "@figma/code-connect";
import AutomationSuccess from "./AutomationSuccess";

figma.connect(
  AutomationSuccess,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=157-16988",
  {
    props: {
      primaryHeader: figma.nestedProps("primaryHeader", {
        header: figma.textContent("Header"),
        body: figma.textContent("Body"),
      }),
    },
    example: (props) => (
      <AutomationSuccess
        header={props.primaryHeader.header}
        body={props.primaryHeader.body}
      />
    ),
  }
);
