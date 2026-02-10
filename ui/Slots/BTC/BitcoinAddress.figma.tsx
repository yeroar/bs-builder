import figma from "@figma/code-connect";
import BitcoinAddress from "./BitcoinAddress";

figma.connect(
  BitcoinAddress,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=174-24570",
  {
    example: () => <BitcoinAddress />,
  }
);
