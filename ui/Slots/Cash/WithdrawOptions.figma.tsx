import figma from "@figma/code-connect";
import WithdrawOptionsSlot from "./WithdrawOptionsSlot";

figma.connect(WithdrawOptionsSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=171-24983", {
  example: () => <WithdrawOptionsSlot />,
});
