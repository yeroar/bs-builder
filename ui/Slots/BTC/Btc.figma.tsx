import figma from "@figma/code-connect";
import BtcSlot from "./BtcSlot";

figma.connect(
  BtcSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-17996",
  {
    example: () => <BtcSlot />,
  }
);
