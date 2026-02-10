import figma from "@figma/code-connect";
import GCRedemptionMethod from "./GCRedemptionMethod";

figma.connect(
  GCRedemptionMethod,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=105-9911",
  {
    example: () => <GCRedemptionMethod />,
  }
);
