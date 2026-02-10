import figma from "@figma/code-connect";
import Btc from "./Btc";

figma.connect(
  Btc,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-17996",
  {
    example: () => <Btc />,
  }
);
