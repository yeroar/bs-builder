import figma from "@figma/code-connect";
import DepositOptions from "./DepositOptions";

figma.connect(
  DepositOptions,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-18041",
  {
    props: {},
    example: () => (
      <DepositOptions
        onInstantPress={() => {}}
        onOneTimePress={() => {}}
        onRecurringPress={() => {}}
      />
    ),
  }
);
