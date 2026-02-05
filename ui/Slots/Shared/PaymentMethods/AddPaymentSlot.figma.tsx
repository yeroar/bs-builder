import figma from "@figma/code-connect";
import AddPaymentSlot from "./AddPaymentSlot";

figma.connect(
  AddPaymentSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-21107",
  {
    example: () => <AddPaymentSlot />,
  }
);
