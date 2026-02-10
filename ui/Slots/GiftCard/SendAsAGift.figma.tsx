import figma from "@figma/code-connect";
import SendAsAGift from "./SendAsAGift";

figma.connect(
  SendAsAGift,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=111-11015",
  {
    example: () => <SendAsAGift />,
  }
);
