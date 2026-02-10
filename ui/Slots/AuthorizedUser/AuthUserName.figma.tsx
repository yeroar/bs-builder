import figma from "@figma/code-connect";
import AuthUserNameSlot from "./AuthUserNameSlot";

figma.connect(AuthUserNameSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20190", {
  example: () => (
    <AuthUserNameSlot
      formData={{ firstName: "", middleName: "", lastName: "" }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
