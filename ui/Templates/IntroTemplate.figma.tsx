import React from "react";
import figma from "@figma/code-connect";
import IntroTemplate from "./IntroTemplate";

figma.connect(
  IntroTemplate,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=145-8192",
  {
    props: {
      primaryHeader: figma.nestedProps("primaryHeader", {
        header: figma.textContent("Header"),
        body: figma.textContent("Body"),
      }),
      children: figma.children("list*"),
    },
    example: (props) => (
      <IntroTemplate
        header={props.primaryHeader.header}
        body={props.primaryHeader.body}
      >
        {props.children}
      </IntroTemplate>
    ),
  }
);
