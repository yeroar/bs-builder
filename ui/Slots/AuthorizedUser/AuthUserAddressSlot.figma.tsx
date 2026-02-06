import figma from "@figma/code-connect";
import AuthUserAddressSlot from "./AuthUserAddressSlot";

figma.connect(AuthUserAddressSlot, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20189", {
  example: () => (
    <AuthUserAddressSlot
      formData={{ address: "", apt: "", city: "", state: "", zip: "", useDefaultAddress: true }}
      onChangeField={(field, value) => console.log(field, value)}
    />
  ),
});
