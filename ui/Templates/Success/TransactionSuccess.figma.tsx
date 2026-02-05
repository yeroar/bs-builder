import figma from "@figma/code-connect";
import TransactionSuccessSlot from "./TransactionSuccessSlot";

figma.connect(TransactionSuccessSlot, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=112-10754", {
  props: {
    header: figma.children("header"),
    children: figma.children("children"),
    footer: figma.children("footer"),
  },
  example: ({ header, children, footer }) => (
    <TransactionSuccessSlot
      header={header}
      footer={footer}
    >
      {children}
    </TransactionSuccessSlot>
  ),
});
