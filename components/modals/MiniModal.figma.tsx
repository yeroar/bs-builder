import React from "react";
import MiniModal from "./MiniModal";
import figma from "@figma/code-connect";

figma.connect(
  MiniModal,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-14052",
  {
    props: {
      variant: figma.enum("variant", {
        default: "default",
        keyboard: "keyboard",
      }),
      showHeader: figma.boolean("hasTopNav"),
      header: figma.boolean("hasTopNav", {
        true: figma.children("topNav"),
        false: undefined,
      }),
      content: figma.children("contentSlot"),
      footer: figma.boolean("hasFooter", {
        true: figma.children("footer"),
        false: undefined,
      }),
    },
    example: (props) => (
      <MiniModal
        variant={props.variant}
        showHeader={props.showHeader}
        footer={props.footer}
        header={props.header}
      >
        {props.content}
      </MiniModal>
    ),
  }
);
