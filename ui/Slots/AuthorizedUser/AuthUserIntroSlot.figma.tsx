import figma from "@figma/code-connect";
import AuthUserIntroSlot from "./AuthUserIntroSlot";

figma.connect(AuthUserIntroSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20192", {
  example: () => <AuthUserIntroSlot />,
});
