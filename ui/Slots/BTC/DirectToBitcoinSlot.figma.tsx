import figma from "@figma/code-connect";
import DirectToBitcoinSlot from "./DirectToBitcoinSlot";

figma.connect(
  DirectToBitcoinSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-18040",
  {
    props: {
      selectedPercentage: figma.enum("percentage", {
        "1%": 1,
        "5%": 5,
        "10%": 10,
        "15%": 15,
        "20%": 20,
        "25%": 25,
      }),
    },
    example: (props) => (
      <DirectToBitcoinSlot
        selectedPercentage={props.selectedPercentage ?? 25}
        onPercentageSelect={() => {}}
        onCustomPress={() => {}}
      />
    ),
  }
);
