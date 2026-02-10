import figma from "@figma/code-connect";
import ChooseDebitCard from "./ChooseDebitCard";

figma.connect(
  ChooseDebitCard,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=77-20812",
  {
    example: () => <ChooseDebitCard />,
  }
);
