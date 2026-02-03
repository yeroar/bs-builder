import figma from "@figma/code-connect";
import ChooseBankAccountSlot from "./ChooseBankAccountSlot";

figma.connect(
  ChooseBankAccountSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20810",
  {
    example: () => <ChooseBankAccountSlot />,
  }
);
