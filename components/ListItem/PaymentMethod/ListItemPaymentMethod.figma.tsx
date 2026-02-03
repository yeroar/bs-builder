import React from "react";
import ListItemPaymentMethod from "./ListItemPaymentMethod";
import { BankIcon } from "../../icons/BankIcon";
import { colorMaps } from "../../tokens";
import figma from "@figma/code-connect";

figma.connect(
  ListItemPaymentMethod,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9484",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("secondaryText"),
      tertiaryText: figma.string("tertiaryText"),
      showDivider: figma.boolean("showDiv"),
      disabled: figma.enum("state", {
        disabled: true,
      }),
    },
    example: (props) => (
      <ListItemPaymentMethod
        title={props.title}
        secondaryText={props.secondaryText}
        tertiaryText={props.tertiaryText}
        icon={<BankIcon width={20} height={20} color={colorMaps.face.primary} />}
        showDivider={props.showDivider}
        disabled={props.disabled}
        onPress={() => {}}
      />
    ),
  }
);
