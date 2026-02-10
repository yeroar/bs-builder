import figma from "@figma/code-connect";
import ChoosePaymentMethodFold from "./ChoosePaymentMethodFold";

figma.connect(
  ChoosePaymentMethodFold,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20811",
  {
    example: () => <ChoosePaymentMethodFold />,
  }
);
