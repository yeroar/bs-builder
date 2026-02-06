import figma from "@figma/code-connect";
import CashSlot from "./CashSlot";

figma.connect(
  CashSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-17984&t=oAFcEQeQzXtt4Itn-4",
  {
    props: {
      cashAmount: figma.nestedProps("cashSurface", {
        amount: figma.textContent("amount"),
      }),
      hasRecurringDeposit: figma.boolean("hasRecurringDeposit"),
    },
    example: (props) => (
      <CashSlot
        cashAmount={props.cashAmount.amount}
        recurringDepositConfig={props.hasRecurringDeposit ? { title: "Weekly deposit", secondaryText: "$100 every week" } : undefined}
      />
    ),
  }
);
