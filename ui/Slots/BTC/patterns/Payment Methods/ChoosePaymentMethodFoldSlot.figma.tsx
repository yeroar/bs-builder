import figma from "@figma/code-connect";
import ChoosePaymentMethodFoldSlot from "./ChoosePaymentMethodFoldSlot";

figma.connect(
  ChoosePaymentMethodFoldSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20811",
  {
    example: () => <ChoosePaymentMethodFoldSlot />,
  }
);
