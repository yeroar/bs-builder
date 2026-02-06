import figma from "@figma/code-connect";
import AuthUserManagerSlot from "./AuthUserManagerSlot";

figma.connect(AuthUserManagerSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20191", {
  example: () => (
    <AuthUserManagerSlot
      authorizedUsers={[]}
      onAddUser={() => console.log("Add user")}
    />
  ),
});
