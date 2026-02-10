import figma from "@figma/code-connect";
import Cash from "./Cash";

figma.connect(
  Cash,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-17984&t=oAFcEQeQzXtt4Itn-4",
  {
    props: {
      cashAmount: figma.nestedProps("cashSurface", {
        amount: figma.textContent("amount"),
      }),
      hasRecurringDeposit: figma.boolean("hasRecurringDeposit"),
    },
    example: (props) => (
      <Cash
        cashAmount={props.cashAmount.amount}
        recurringDepositConfig={props.hasRecurringDeposit ? { title: "Weekly deposit", secondaryText: "$100 every week" } : undefined}
      />
    ),
  }
);
