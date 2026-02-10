import figma from "@figma/code-connect";
import AuthUserIntro from "./AuthUserIntro";

figma.connect(AuthUserIntro, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20192", {
  example: () => <AuthUserIntro />,
});
