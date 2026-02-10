import figma from "@figma/code-connect";
import ChooseBankAccount from "./ChooseBankAccount";

figma.connect(
  ChooseBankAccount,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20810",
  {
    example: () => <ChooseBankAccount />,
  }
);
