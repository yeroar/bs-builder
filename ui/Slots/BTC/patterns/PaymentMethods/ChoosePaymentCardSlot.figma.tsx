import figma from "@figma/code-connect";
import ChoosePaymentCardSlot from "./ChoosePaymentCardSlot";

figma.connect(
  ChoosePaymentCardSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20812",
  {
    example: () => <ChoosePaymentCardSlot />,
  }
);
