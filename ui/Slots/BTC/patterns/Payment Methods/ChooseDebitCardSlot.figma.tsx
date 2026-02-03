import figma from "@figma/code-connect";
import ChooseDebitCardSlot from "./ChooseDebitCardSlot";

figma.connect(
  ChooseDebitCardSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20812",
  {
    example: () => <ChooseDebitCardSlot />,
  }
);
