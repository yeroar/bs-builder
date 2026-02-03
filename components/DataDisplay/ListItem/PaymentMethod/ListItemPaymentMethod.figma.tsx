import figma from "@figma/code-connect";
import ListItemPaymentMethod from "./ListItemPaymentMethod";

figma.connect(
  ListItemPaymentMethod,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=20-9484",
  {
    props: {
      title: figma.string("title"),
      secondaryText: figma.string("secondaryText"),
      tertiaryText: figma.string("tertiaryText"),
      showDivider: figma.boolean("showDiv"),
      disabled: figma.enum("state", { disabled: true }),
    },
    example: (props) => (
      <ListItemPaymentMethod
        title={props.title}
        secondaryText={props.secondaryText}
        tertiaryText={props.tertiaryText}
        showDivider={props.showDivider}
        disabled={props.disabled}
      />
    ),
  }
);
