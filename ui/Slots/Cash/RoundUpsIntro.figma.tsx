import figma from "@figma/code-connect";
import RoundUpsIntro from "./RoundUpsIntro";

figma.connect(
  RoundUpsIntro,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=219-23299",
  {
    example: () => <RoundUpsIntro />,
  }
);
