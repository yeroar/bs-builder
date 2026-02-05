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
        destructive: "destructive",
      }),
      header: figma.boolean("hasTopNav", {
        true: figma.instance("topNav"),
        false: undefined,
      }),
      children: figma.children("contentSlot"),
      footer: figma.boolean("hasFooter", {
        true: figma.children("footer"),
        false: undefined,
      }),
    },
    example: (props) => (
      <MiniModal
        variant={props.variant}
        header={props.header}
        footer={props.footer}
      >
        {props.children}
      </MiniModal>
    ),
  }
);
