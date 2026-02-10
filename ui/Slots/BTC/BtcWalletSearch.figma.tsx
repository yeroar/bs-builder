import figma from "@figma/code-connect";
import BtcWalletSearchSlot from "./BtcWalletSearchSlot";

figma.connect(
  BtcWalletSearchSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29058",
  {
    variant: { state: "empty" },
    example: () => <BtcWalletSearchSlot />,
  }
);

figma.connect(
  BtcWalletSearchSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29058",
  {
    variant: { state: "populated" },
    example: () => <BtcWalletSearchSlot value="3NC53DaHr9VY37dUgDQveG5qsTH9wff5..." />,
  }
);
