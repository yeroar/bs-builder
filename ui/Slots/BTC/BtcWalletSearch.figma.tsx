import figma from "@figma/code-connect";
import BtcWalletSearch from "./BtcWalletSearch";

figma.connect(
  BtcWalletSearch,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29058",
  {
    variant: { state: "empty" },
    example: () => <BtcWalletSearch />,
  }
);

figma.connect(
  BtcWalletSearch,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-29058",
  {
    variant: { state: "populated" },
    example: () => <BtcWalletSearch value="3NC53DaHr9VY37dUgDQveG5qsTH9wff5..." />,
  }
);
