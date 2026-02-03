import figma from "@figma/code-connect";
import SendAsAGiftSlot from "./SendAsAGiftSlot";

figma.connect(SendAsAGiftSlot, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=111-11015", {
  props: {},
  example: () => (
    <SendAsAGiftSlot
      deliveryMethod="text"
      onDeliveryMethodChange={(method) => {}}
      onSenderNameChange={(value) => {}}
      onRecipientPhoneChange={(value) => {}}
      onRecipientNameChange={(value) => {}}
      onGiftMessageChange={(value) => {}}
    />
  ),
});
