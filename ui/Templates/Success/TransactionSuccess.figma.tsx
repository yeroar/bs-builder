import figma from "@figma/code-connect";
import TransactionSuccess from "./TransactionSuccess";

figma.connect(TransactionSuccess, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=112-10754", {
  props: {
    header: figma.children("header"),
    children: figma.children("children"),
    footer: figma.children("footer"),
  },
  example: ({ header, children, footer }) => (
    <TransactionSuccess
      header={header}
      footer={footer}
    >
      {children}
    </TransactionSuccess>
  ),
});
