import React from "react";
import Message from "./Message";
import figma from "@figma/code-connect";

figma.connect(
  Message,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-6549",
  {
    props: {
      title: figma.string("title"),
      message: figma.string("messageText"),
      variant: figma.enum("variant", {
        information: "information",
        warning: "warning",
        error: "error",
      }),
      hasButton: figma.boolean("action"),
    },
    example: (props) => (
      <Message
        title={props.title}
        message={props.message}
        variant={props.variant}
        hasButton={props.hasButton}
        onActionPress={() => {}}
      />
    ),
  }
);
