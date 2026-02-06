import figma from "@figma/code-connect";
import GCDetailSlot from "./GCDetailSlot";

figma.connect(
  GCDetailSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=139-22462&t=oAFcEQeQzXtt4Itn-4",
  {
    props: {
      logo: figma.children("iconContainerBrand"),
      title: figma.textContent("header"),
      offer: figma.children("*"),
    },
    example: (props) => (
      <GCDetailSlot
        logo={props.logo}
        title={props.title}
        offer={props.offer}
        onAmountSelect={() => { }}
      />
    ),
  }
);
