import figma from "@figma/code-connect";
import RecurringDepositDetailsSlot from "./RecurringDepositDetailsSlot";

figma.connect(
  RecurringDepositDetailsSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-25590",
  {
    props: {
      state: figma.enum("state", {
        active: "active",
        paused: "paused",
      }),
    },
    example: (props) => <RecurringDepositDetailsSlot state={props.state} />,
  }
);
