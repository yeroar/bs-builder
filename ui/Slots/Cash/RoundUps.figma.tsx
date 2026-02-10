import figma from "@figma/code-connect";
import RoundUps, { Multiplier } from "./RoundUps";

figma.connect(
  RoundUps,
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
      <RoundUps
        selectedMultiplier={props.selectedMultiplier}
        onMultiplierSelect={() => {}}
        currentAmount={0}
        threshold={10}
      />
    ),
  }
);
