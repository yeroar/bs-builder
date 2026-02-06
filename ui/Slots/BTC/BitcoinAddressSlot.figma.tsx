import figma from "@figma/code-connect";
import BitcoinAddressSlot from "./BitcoinAddressSlot";

figma.connect(
  BitcoinAddressSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-24570",
  {
    example: () => <BitcoinAddressSlot />,
  }
);
