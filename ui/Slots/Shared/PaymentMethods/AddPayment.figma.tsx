import figma from "@figma/code-connect";
import AddPayment from "./AddPayment";

figma.connect(
  AddPayment,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-21107",
  {
    example: () => <AddPayment />,
  }
);
