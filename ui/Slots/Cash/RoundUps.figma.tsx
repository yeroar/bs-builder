import figma from "@figma/code-connect";
import RoundUpsSlot, { Multiplier } from "./RoundUpsSlot";

figma.connect(
  RoundUpsSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=157-4127",
  {
    props: {
      selectedMultiplier: figma.enum("multiplier", {
        "1x": "1x",
        "2x": "2x",
        "5x": "5x",
        "10x": "10x",
      }) as Multiplier,
    },
    example: (props) => (
      <RoundUpsSlot
        selectedMultiplier={props.selectedMultiplier}
        onMultiplierSelect={() => {}}
        currentAmount={0}
        threshold={10}
      />
    ),
  }
);
