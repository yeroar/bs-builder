import figma from "@figma/code-connect";
import AuthUserDetails from "./AuthUserDetails";

figma.connect(AuthUserDetails, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20188", {
  example: () => (
    <AuthUserDetails
      formData={{ dobMonth: "", dobDay: "", dobYear: "", ssn: "", email: "" }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
