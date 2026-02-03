import figma from "@figma/code-connect";
import PillSelector from "./PillSelector";

figma.connect(
  PillSelector,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=32-715",
  {
    props: {
      label: figma.string("label"),
      isActive: figma.enum("state", {
        Active: true,
        Default: false,
        Pressed: false,
      }),
      size: figma.enum("size", {
        md: "md",
        sm: "sm",
      }),
    },
    example: (props) => (
      <PillSelector
        label={props.label}
        isActive={props.isActive}
        variant="onBrand"
        size={props.size}
      />
    ),
  }
);
