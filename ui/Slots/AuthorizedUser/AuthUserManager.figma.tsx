import figma from "@figma/code-connect";
import AuthUserManager from "./AuthUserManager";

figma.connect(AuthUserManager, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20191", {
  example: () => (
    <AuthUserManager
      authorizedUsers={[]}
      onAddUser={() => console.log("Add user")}
    />
  ),
});
