import figma from "@figma/code-connect";
import CashWithdrawTx from "./CashWithdrawTx";

figma.connect(CashWithdrawTx, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=171-23754", {
  props: {
    type: figma.enum("type", {
      "instantWithdraw": "instant",
      "oneTime": "oneTime",
    }),
  },
  example: (props) => <CashWithdrawTx type={props.type} transferAmount="$100.00" totalAmount="$101.50" />,
});
