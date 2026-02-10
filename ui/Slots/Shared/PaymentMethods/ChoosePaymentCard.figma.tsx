import figma from "@figma/code-connect";
import ChoosePaymentCard from "./ChoosePaymentCard";

figma.connect(
  ChoosePaymentCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20812",
  {
    example: () => <ChoosePaymentCard />,
  }
);
