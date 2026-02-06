import figma from "@figma/code-connect";
import RecurringDepositSlot from "./RecurringDepositSlot";

figma.connect(
  RecurringDepositSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=180-24681",
  {
    props: {
      hasActive: figma.boolean("hasActive"),
    },
    example: (props) => <RecurringDepositSlot hasActive={props.hasActive} />,
  }
);
