import figma from "@figma/code-connect";
import GCDetailSlot from "./GCDetailSlot";

figma.connect(
  GCDetailSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=139-22462",
  {
    props: {
      brand: figma.string("brand"),
      title: figma.textContent("Header"),
      satsBack: figma.textContent("satsBack"),
      availability: figma.textContent("availability"),
    },
    example: (props) => (
      <GCDetailSlot
        brand={props.brand ?? "uber"}
        title={props.title ?? "Uber gift card"}
        satsBack={props.satsBack}
        availability={props.availability}
        onAmountSelect={() => {}}
      />
    ),
  }
);
