import figma from "@figma/code-connect";
import DepositOptionsSlot from "./DepositOptionsSlot";

figma.connect(
  DepositOptionsSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-18041",
  {
    props: {},
    example: () => (
      <DepositOptionsSlot
        onInstantPress={() => {}}
        onOneTimePress={() => {}}
        onRecurringPress={() => {}}
      />
    ),
  }
);
