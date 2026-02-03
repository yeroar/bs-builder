import figma from "@figma/code-connect";
import BtcBuyModalSlot from "./BtcBuyModalSlot";

figma.connect(
  BtcBuyModalSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18340",
  {
    example: () => <BtcBuyModalSlot selectedAmount={null} onSelectAmount={() => {}} />,
  }
);
