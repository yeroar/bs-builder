import figma from "@figma/code-connect";
import AuthUserDetailsSlot from "./AuthUserDetailsSlot";

figma.connect(AuthUserDetailsSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20188", {
  example: () => (
    <AuthUserDetailsSlot
      formData={{ dobMonth: "", dobDay: "", dobYear: "", ssn: "", email: "" }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
