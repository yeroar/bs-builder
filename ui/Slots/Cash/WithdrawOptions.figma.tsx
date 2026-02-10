import figma from "@figma/code-connect";
import WithdrawOptions from "./WithdrawOptions";

figma.connect(WithdrawOptions, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=171-24983", {
  example: () => <WithdrawOptions />,
});
