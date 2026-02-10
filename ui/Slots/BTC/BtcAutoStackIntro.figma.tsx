import figma from "@figma/code-connect";
import BtcAutoStackIntro from "./BtcAutoStackIntro";

figma.connect(
  BtcAutoStackIntro,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=219-23220",
  {
    example: () => <BtcAutoStackIntro />,
  }
);
