import figma from "@figma/code-connect";
import AuthUserAddress from "./AuthUserAddress";

figma.connect(AuthUserAddress, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20189", {
  example: () => (
    <AuthUserAddress
      formData={{ address: "", apt: "", city: "", state: "", zip: "", useDefaultAddress: true }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
