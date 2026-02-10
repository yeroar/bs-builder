import figma from "@figma/code-connect";
import AuthUserName from "./AuthUserName";

figma.connect(AuthUserName, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20190", {
  example: () => (
    <AuthUserName
      formData={{ firstName: "", middleName: "", lastName: "" }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
